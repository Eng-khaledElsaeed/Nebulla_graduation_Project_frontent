<script setup lang="ts">
import { useStore } from '~/store/useStore';
import { ref, watch, computed, onMounted } from "vue";
const { $swal } = useNuxtApp()
getUserlistColections()

const store = useStore()
const isSidebarActive = computed(() => store.isSidebarActive)


const smallprompts = [
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
]



let data = [];

definePageMeta({
  middleware: ["auth"],
  layout: 'chatwindow',
})

</script>

<template>
  <div class="chat-container">
    <!--<div></div>-->
    <div class="chat-window">
      <div class="chat-heading" v-if="data.length <= 0">
        <h1>Hello, khaled</h1>
        How can I help you today?
      </div>

      <div class="chat-content">
        <section id="examplePrompts" class="row" v-if="data.length <= 0">
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
              <ClintPromptRequest :userPromotText="prompt.user_chat" />
              <ServerPromptResponse :ModelResponseText="prompt.response_chat" />
            </div>
          </div>
        </section>
        <ModelTextInput></ModelTextInput>
      </div>
    </div>
  </div>
</template>
