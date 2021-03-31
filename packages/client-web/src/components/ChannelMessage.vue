<template>
  <div class="max-w-lg p-2 mx-auto text-sm text-gray-200" v-if="message.event">
    {{ message.event }}
  </div>
  <div class="flex items-end space-x-2" v-else>
    <div v-if="sentByMe" class="place-self-end">
      <Message :body="body" :sentByMe="sentByMe" :lastFromSender="lastFromSender"
        :sender="sender" :time="time"/>
      <EmbedAvatar :avatar="sender.avatar" :lastFromSender="lastFromSender"/>
    </div>

    <div v-else-if="!sentByMe">
      <EmbedAvatar :avatar="sender.avatar" :lastFromSender="lastFromSender"/>
      <!--
      bash code for how I wrote that line
      I know
      for i in body sentByMe lastFromSender sender time; do printf ":$i=\"$i\" "; done
      -->
      <Message :body="body" :sentByMe="sentByMe" :lastFromSender="lastFromSender"
        :sender="sender" :time="time"/>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import MarkdownIt from "markdown-it";
import MarkdownItEmoji from "markdown-it-emoji";

export default {
  props: ["message"],
  data() {
    return {
      time: "",
      timeUpdateInterval: null,
    };
  },
  computed: {
    channel() {
      return this.$store.getters.channelById(this.message.channel);
    },
    sentByMe() {
      return this.message.sender === this.$store.getters.user.id;
    },
    sender() {
      let sender;

      if (this.sentByMe) {
        sender = this.$store.getters.user;
      } else {
        sender = this.channel.users.find((u) => u.id === this.message.sender);
      }

      return sender;
    },
    precedingMessage() {
      return this.channel.messages.filter((m) => m.time < this.message.time)[0];
    },
    supersedingMessage() {
      return this.channel.messages.filter((m) => m.time > this.message.time)[0];
    },
    lastFromSender() {
      return (
        !this.supersedingMessage ||
        this.supersedingMessage.type !== this.message.type ||
        this.supersedingMessage.sender !== this.message.sender
      );
    },
    eventTarget() {
      if (this.isEvent) {
        const me = this.$store.getters.user;

        if (this.message.body === me.id) {
          return me;
        } else {
          return this.channel.users.find((u) => u.id === this.message.body);
        }
      }
    },
    body() {
      if (this.message.decrypted) {
        return new MarkdownIt("zero", {
          html: false,
          linkify: true,
        })
          .enable([
            "emphasis",
            "strikethrough",
            "backticks",
            "fence",
            "linkify",
          ])
          .use(MarkdownItEmoji)
          .renderInline(this.message.decrypted)
          .trim();
      } else {
        return "[Failed to decrypt message]";
      }
    },
  },
  methods: {
    updateTime() {
      this.time = moment(this.message.time)
        .fromNow()
        .replace("a few seconds", "now")
        .replace(" minutes", "m")
        .replace(" hours", "h")
        .replace(" days", "d")
        .replace(" weeks", "w")
        .replace(" months", "y")
        .replace(" years", "y")
        .replace("a minute", "1m")
        .replace("an hour", "1h")
        .replace("a day", "1d")
        .replace("a week", "1w")
        .replace("a month", "1m")
        .replace("a year", "1y")
        .replace(" ago", "")
        .replace("in ", "");
    },
    async delete() {
      await this.$store.dispatch("deleteMesasge", this.message);
    },
  },
  beforeMount() {
    this.updateTime();
    this.timeUpdateInterval = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeUpdateInterval);
  },
  components: {
    Message: () => import("./Message"),
    EmbedAvatar: () => import("./EmbedAvatar"),
  },
};
</script>
