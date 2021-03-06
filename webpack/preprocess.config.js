const pug = require('pug')

const helpers = `
mixin each(loop)
  | {#each #{loop}}
  if block
    block
  | {/each}

mixin if(condition)
  | {#if #{condition}}
  if block
    block
  | {/if}

mixin else
  | {:else}
  if block
    block

mixin await(promise)
  | {#await #{promise}}
  if block
    block
  | {/await}

mixin then(answer)
  | {:then #{answer}}
  if block
    block

mixin catch(error)
  | {:catch #{error}}
  if block
    block
`

module.exports = {
  transformers: {
    /** Use a custom preprocess method by passing a function. */
    pug({ content, filename }) {
      //const code = pug.render(content.replace('{#each', '| {#each').replace('{/each', '| {/each'))
      const code = pug.render(`${helpers}\n${content}`)
      console.log('code', code)
      return { code, map: null }
    },
  
  },
  
}
