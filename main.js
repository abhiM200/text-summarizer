import './style.css';
import { DesignLog } from './js/designLog.js';

const designLog = new DesignLog();

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold gradient-text mb-2">WordGo</h1>
        <p class="text-gray-600">AI-Powered Text Summarizer</p>
      </div>
      
      <div class="grid gap-6 lg:grid-cols-2">
        <!-- Input Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Your Text
            </label>
            <textarea
              id="input-text"
              rows="6"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste your text here (minimum 100 characters)"
            ></textarea>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-500">
              <span id="char-count">0</span> characters
            </div>
            <button
              id="summarize-btn"
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
              disabled
            >
              Summarize
            </button>
          </div>
          
          <div id="result" class="hidden border-t mt-6">
            <div class="pt-6">
              <h2 class="text-lg font-semibold text-gray-900 mb-3">Summary</h2>
              <div id="summary-text" class="prose text-gray-700"></div>
            </div>
          </div>
          
          <div id="loading" class="hidden">
            <div class="text-center py-4">
              <div class="text-indigo-600">
                Analyzing text<span class="loading-dots"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- Design Log Section -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-lg font-semibold text-gray-900 mb-4 flex items-center justify-between">
            <span>Design Log</span>
            <span class="text-sm font-normal text-gray-500">Last 10 summaries</span>
          </h2>
          <div id="design-log" class="divide-y divide-gray-200">
            <p class="text-gray-500 text-center py-4">No summaries generated yet</p>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center mt-8 text-sm text-gray-500">
        Created by Abhishek
      </div>
    </div>
  </div>
`;

const inputText = document.querySelector('#input-text');
const charCount = document.querySelector('#char-count');
const summarizeBtn = document.querySelector('#summarize-btn');
const result = document.querySelector('#result');
const summaryText = document.querySelector('#summary-text');
const loading = document.querySelector('#loading');
const designLogContainer = document.querySelector('#design-log');

// Update character count and button state
inputText.addEventListener('input', () => {
  const length = inputText.value.length;
  charCount.textContent = length;
  summarizeBtn.disabled = length < 100;
});

summarizeBtn.addEventListener('click', async () => {
  const text = inputText.value;
  
  // Show loading state
  loading.classList.remove('hidden');
  result.classList.add('hidden');
  summarizeBtn.disabled = true;
  
  try {
    // In a real application, you would make an API call to OpenAI here
    // For demo purposes, we'll simulate a delay and return a mock summary
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const summary = `This is a simulated AI summary of your text. In a production environment, 
      this would be generated using the OpenAI API. The actual implementation would send your 
      text to the API and receive a concise, accurate summary in return.`;
    
    // Add entry to design log
    designLog.addEntry(text, summary);
    designLogContainer.innerHTML = designLog.generateLogHTML();
    
    summaryText.textContent = summary;
    result.classList.remove('hidden');
  } catch (error) {
    summaryText.textContent = 'An error occurred while generating the summary. Please try again.';
    result.classList.remove('hidden');
  } finally {
    loading.classList.add('hidden');
    summarizeBtn.disabled = false;
  }
});