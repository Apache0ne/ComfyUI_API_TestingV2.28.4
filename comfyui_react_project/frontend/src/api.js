const API_BASE_URL = 'http://localhost:5000/api';

export const getCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};

export const getModelsAndLoras = async (category) => {
  const response = await fetch(`${API_BASE_URL}/models?category=${encodeURIComponent(category)}`);
  if (!response.ok) {
    throw new Error('Failed to fetch models and LoRAs');
  }
  return response.json();
};

export const getWorkflows = async () => {
  const response = await fetch(`${API_BASE_URL}/workflows`);
  if (!response.ok) {
    throw new Error('Failed to fetch workflows');
  }
  return response.json();
};

export const generateImage = async (promptData, workflow) => {
  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...promptData, workflow }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate image');
  }

  // Clone the response before reading the body
  const clonedResponse = response.clone();

  const blob = await clonedResponse.blob();
  const imageUrl = URL.createObjectURL(blob);

  return {
    image_url: imageUrl,
    original_prompt: response.headers.get('X-Original-Prompt'),
    improved_prompt: response.headers.get('X-Improved-Prompt')
  };
};

export const saveLLMSetup = async (setupData) => {
  const response = await fetch(`${API_BASE_URL}/setup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(setupData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to save LLM setup: ${errorText}`);
  }
  return response.json();
};

export const getLLMSetup = async () => {
  const response = await fetch(`${API_BASE_URL}/setup`);
  if (!response.ok) {
    throw new Error('Failed to fetch LLM setup');
  }
  return response.json();
};