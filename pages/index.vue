<script setup lang="ts">
const smallprompts = [
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
  { title: "Small Carts", text: "Small Carts body" },
]
</script>
<template>
  <div>
    <div class="page-heading">
      <h3>Hello, khaled</h3>
      How can I help you today?
    </div>
    <div class="page-content">
      <section id="examplePrompts" class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 col-md-3" v-for="prompt in smallprompts">
              <SmallExamplePrompts :prompt-title="prompt.title" :prompt-text="prompt.text"></SmallExamplePrompts>
            </div>
          </div>
        </div>
      </section>

      <section id="Prompts" class="row">
        <div class="col-12">
          <div class="row">

            <div class="col-12">

              <ClintPromptRequest />
              <ServerPromptResponse />



            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>
