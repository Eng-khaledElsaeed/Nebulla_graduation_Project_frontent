<script setup lang="ts">
import { useStore } from '~/store';
import { ref, watch, computed, onMounted } from "vue";

const store = useStore()
const isSidebarActive = computed(() => store.isSidebarActive)

const smallprompts = [
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
]

const data = [
  {
    user: "What is the weather like today?",
    model: "It looks like it will be sunny with a high of 72 degrees Fahrenheit and a low of 50 degrees Fahrenheit."
  },
  {
    user: "What are some good restaurants near me?",
    model: "There are several great restaurants in your area! Based on your preferences, I can recommend [Italian restaurant name] for delicious pasta dishes, [Thai restaurant name] for authentic Thai cuisine, or [Mexican restaurant name] for fresh and flavorful Mexican food. Would you like me to find their addresses and reviews?"
  },
  {
    user: "Tell me a joke.",
    model: "Why did the scarecrow win an award? Because he was outstanding in his field!"
  },
  {
    user: "What is the capital of France?",
    model: "The capital of France is Paris."
  }
];

definePageMeta({
  layout: 'chatwindow'
})
</script>

<template>
  <div class="chat-container">
    <!--<div></div>-->
    <div class="chat-window">
      

      <div class="chat-heading" v-if="data.length < 0">
        <h3>Hello, khaled</h3>
        How can I help you today?
      </div>

      <div class="chat-content">
        <section id="examplePrompts" class="row" v-if="data.length < 0">
          <div class="col-12">
            <div class="row">
              <div class="col-12 col-md-3" v-for="prompt in smallprompts">
                <SmallExamplePrompts :prompt-title="prompt.title" :prompt-text="prompt.text"></SmallExamplePrompts>
              </div>
            </div>
          </div>
        </section>

        <section id="Prompts" class="row" v-else>
          <div class="col-12">
            <div class="prompt-container" v-for="prompt in data">
              <ClintPromptRequest :userPromotText="prompt.user" />
              <ServerPromptResponse :ModelResponseText="prompt.model" />
            </div>
          </div>
        </section>
      </div>

      <ModelTextInput></ModelTextInput>

    </div>
  </div>
</template>
