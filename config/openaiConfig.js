import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

async function mealsFunction(req, res) {
  const { input } = req.body;

  const meals = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Create a list of simple meals, in UK format based on this: ${input}`,
      },
    ],
    model: "gpt-4o-mini",
    max_tokens: 500,
  });

  const mealsResponse = meals.choices[0].message.content;

  console.log("Meals response:", mealsResponse);

  const ingredientsList = await shoppingList(mealsResponse);

  console.log("Ingredients List:", ingredientsList);

  res.status(200).json({
    meals: mealsResponse,
    ingredients: ingredientsList,
  });
}

async function shoppingList(meals) {
  const ingredients = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `create a shopping list based on in a csv format ${meals}`,
      },
    ],
    model: "gpt-4o-mini",
    max_tokens: 100,
  });
  return ingredients.choices[0].message.content;
}

export default mealsFunction;
