<template>
  <div>
    <div id="nav">
      <router-link to="/xss/">Insecure</router-link> |
      <router-link to="/xss/secure">Secure</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'XSS',
};
</script>
