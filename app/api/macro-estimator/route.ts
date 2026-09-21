import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { foodName, menuItems, imageBase64 } = body;

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    let targetFood = foodName || (menuItems && menuItems.join(', ')) || 'Bhandara Special Puri Aloo & Kheer';

    if (apiKey) {
      try {
        const promptText = `You are "GymRat AI", a fun, hyper-knowledgeable fitness coach inspecting Indian community feast food (Bhandara).
Analyze the following food item/plate: "${targetFood}".
Return ONLY a valid raw JSON object (no markdown, no backticks) with the following structure:
{
  "foodItem": "${targetFood}",
  "calories": number (estimated total kcal),
  "protein": number (grams),
  "carbs": number (grams),
  "fat": number (grams),
  "verdict": string (A punchy 1-2 sentence fitness advice for gym bro/gym rat, e.g. "Carb heaven! Great post-leg-day refeed, hit 1 scoop whey protein to balance!"),
  "healthScore": number (out of 10)
}`;

        const payload: any = {
          contents: [
            {
              parts: [
                { text: promptText }
              ]
            }
          ]
        };

        if (imageBase64) {
          const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
          payload.contents[0].parts.push({
            inline_data: {
              mime_type: 'image/jpeg',
              data: cleanBase64
            }
          });
        }

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const cleanedJsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanedJsonText);
            return NextResponse.json({ success: true, data: parsed, source: 'gemini' });
          }
        }
      } catch (geminiErr) {
        console.warn('Gemini API call error, using smart fallback', geminiErr);
      }
    }

    // Smart Fallback Estimator logic
    const lower = targetFood.toLowerCase();
    let calories = 480;
    let protein = 12;
    let carbs = 65;
    let fat = 18;
    let verdict = "Solid high-energy Prasad fuel! Excellent carb loading for an intense leg day. Pair with a protein shake!";
    let healthScore = 8;

    if (lower.includes('puri') || lower.includes('poori') || lower.includes('aloo')) {
      calories = 520;
      protein = 10;
      carbs = 68;
      fat = 22;
      verdict = "Desi Ghee Puri power! Heavy carb loading for max pump. Throw in 1 scoop protein powder later! 💪🏋️‍♂️";
      healthScore = 7.5;
    } else if (lower.includes('kheer') || lower.includes('payasam') || lower.includes('halwa')) {
      calories = 340;
      protein = 7;
      carbs = 48;
      fat = 14;
      verdict = "Delicious fast-digesting simple carbs! Perfect glycogen replenishment right after a heavy session! 🥛🔥";
      healthScore = 8.0;
    } else if (lower.includes('kadhi') || lower.includes('chawal') || lower.includes('chana')) {
      calories = 450;
      protein = 15;
      carbs = 72;
      fat = 11;
      verdict = "Kadhi Chawal combo gives great gut probiotics and steady complex carbs. Good plant protein boost! 🌾🍲";
      healthScore = 8.8;
    }

    return NextResponse.json({
      success: true,
      data: {
        foodItem: targetFood,
        calories,
        protein,
        carbs,
        fat,
        verdict,
        healthScore
      },
      source: 'fallback'
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
