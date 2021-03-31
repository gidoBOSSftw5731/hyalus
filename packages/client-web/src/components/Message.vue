<template :model="message">
    <div
      class="max-w-md p-2 rounded-md"
      :class="{
        'bg-primary-500 text-white': sentByMe,
        'bg-gray-800': !sentByMe,
      }"
    >
      <p v-if="!sentByMe && lastFromSender" class="text-xs text-gray-400">
        {{ sender.name }}
      </p>
      <div class="text-sm break-all whitespace-pre-wrap" v-html="body"></div>
      <p
        class="text-xs"
        :class="{
          'text-white justify-items-end': sentByMe,
          'text-gray-400 justify-items-start': !sentByMe,
        }"
      >
        {{ time }}
      </p>
      </div>
</template>


<script>
export default {
  props: ["body", "sentByMe", "lastFromSender", "sender", "time"],
};


</script>
<