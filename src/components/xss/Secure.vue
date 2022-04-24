<template>
  <div>
    <label for="secure-field">Lets steal some data, you know how to do it....</label>
    <input id="secure-field" type="text" v-model="nMessage" />
    <button type="button" @click="send">Send</button>
    <p v-for="(message, index) in messages" :key="index" v-html="message"></p>
  </div>
</template>

<script>
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';

export default {
  name: 'XSSSecure',
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
    //<img src="x"/>

    sanitizeMessage(message) {
      return sanitizeHtml(message, {
        allowedTags: ['img'],
        allowedAttributes: {
          img: ['src'],
        },
      });
    },
    async getMessages() {
      try {
        const {
          data: { items },
        } = await axios.get('http://localhost:3003/message', { validateStatus: status => status === 200 });

        this.messages = items.map(this.sanitizeMessage);
      } catch (error) {
        Sentry.captureException('Error while get messages', { extra: { error } });
      }
    },
    async send() {
      if (!this.nMessage) {
        return;
      }
      await axios.post(
        'http://localhost:3003/message',
        { text: this.nMessage },
        { validateStatus: status => status === 201 }
      );

      this.nMessage = null;
    },
  },
};
</script>
