<template>
  <router-link
    class="flex items-center p-2 space-x-2 text-sm transition cursor-pointer hover:bg-gray-700"
    :to="`/channels/${channel.id}`"
  >
    <UserAvatar class="w-8 h-8 rounded-full" :id="avatar" v-if="avatar" />
    <div
      class="flex items-center justify-center w-8 h-8 font-bold bg-primary-500 text-white rounded-full"
      v-else
    >
      {{ name.slice(0, 1).toUpperCase() }}
    </div>
    <div class="flex-1 w-full min-w-0">
      <div class="flex items-baseline justify-between min-w-0 space-x-2">
        <p class="font-bold truncate">{{ name }}</p>
        <p class="text-xs text-gray-400">
          {{ time }}
        </p>
      </div>
      <p class="text-gray-400 truncate">
        {{ subtitle }}
      </p>
    </div>
  </router-link>
</template>

<script>
import moment from "moment";

export default {
  props: ["channel"],
  data() {
    return {
      time: "",
      timeUpdateInterval: null,
    };
  },
  computed: {
    avatar() {
      if (this.channel.type === "dm") {
        return this.channel.users[0].avatar;
      }

      return this.channel.avatar;
    },
    name() {
      if (this.channel.type === "dm") {
        return this.channel.users[0].name;
      }

      return this.channel.name;
    },
    subtitle() {
      let subtitle = "No messages yet";

      if (this.channel.lastMessage?.decrypted) {
        const sender = this.channel.users.find(
          (u) => u.id === this.channel.lastMessage.sender
        );

        subtitle = `${sender ? sender.name : "Me"} \u2022 ${
          this.channel.lastMessage.decrypted
        }`;
      }

      if (this.channel.lastMessage?.event) {
        subtitle = this.channel.lastMessage.event;
      }

      return subtitle;
    },
    updatedTime() {
      return;
    },
  },
  methods: {
    updateTime() {
      // this.time = moment(this.channel.lastMessage?.time || this.channel.created)
      //   .fromNow()
      //   .replace("a few seconds", "now")
      //   .replace(" minutes", "m")
      //   .replace(" hours", "h")
      //   .replace(" days", "d")
      //   .replace(" weeks", "w")
      //   .replace(" months", "M")
      //   .replace(" years", "y")
      //   .replace("a minute", "1m")
      //   .replace("an hour", "1h")
      //   .replace("a day", "1d")
      //   .replace("a week", "1w")
      //   .replace("a month", "1M")
      //   .replace("a year", "1y")
      //   .replace(" ago", "")
      //   .replace("in ", "");

      const time = this.channel.lastMessage?.time || this.channel.created;
      const duration = moment.duration(new Date() - time);

      this.time = "now";

      if (duration.asMinutes() >= 1) {
        this.time = `${Math.floor(duration.asMinutes())}m`;
      }

      if (duration.asHours() >= 1) {
        this.time = `${Math.floor(duration.asHours())}h`;
      }

      if (duration.asDays() >= 1) {
        this.time = `${Math.floor(duration.asDays())}d`;
      }

      if (duration.asMonths() >= 1) {
        this.time = `${moment(time).format("l")}`;
      }
    },
  },
  created() {
    this.updateTime();
    this.timeUpdateInterval = setInterval(this.updateTime, 6e4); //60s
  },
  beforeDestroy() {
    clearInterval(this.timeUpdateInterval);
  },
  components: {
    UserAvatar: () => import("./UserAvatar"),
  },
};
</script>
