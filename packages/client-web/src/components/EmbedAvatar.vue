<template>
    <UserAvatar
      class="w-8 h-8 rounded-full"
      :id="avatar"
      :class="{
        'opacity-0': !lastFromSender,
      }"
    />
</template>

<script>
export default {
  props: ["avatar", "lastFromSender"],
  components: {
    UserAvatar: () => import("./UserAvatar"),
  },
};
</script> 