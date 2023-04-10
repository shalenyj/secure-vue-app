<template>
  <div>
    <label for="unsecure-field">Lets steal some data, you know how to do it....</label>
    <input id="unsecure-field" type="text" v-model="nMessage" />
    <button type="button" @click="send">Send</button>
    <p v-for="message in messages" :key="message" v-html="message"></p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'XSSInsecure',
  data() {
    return {
      messages: [],
      nMessage: null,
    };
  },
  created() {
    this.getMessages();
    document.cookie = `some-key:impressive-key-on${new Date().getSeconds()};`;
  },
  methods: {
    async getMessages() {
      try {
        const {
          data: { items },
        } = await axios.get('http://localhost:3003/message', { validateStatus: status => status === 200 });

        this.messages = items;
      } catch (error) {
        Sentry.captureException('Error while get messages', { extra: { error } });
      }
    },
    async send() {
      if (!this.nMessage) {
        return;
      }
      try {
        await axios.post(
          'http://localhost:3003/message',
          { text: this.nMessage },
          { validateStatus: status => status === 201 }
        );

        this.nMessage = null;
      } catch (error) {
        Sentry.captureException('Error while post message', { extra: { error } });
      }
    },
  },
};
</script>
