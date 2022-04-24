import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'your private key',
  integrations: [new Integrations.Vue({ Vue, attachProps: true, logErrors: true })],
});

window.Sentry = Sentry;

Sentry.captureException(new Error('We found a sneaky user '), {
  extra: {
    name: 'some bad guy',
    date: '24 Nov 2020',
  },
});

Sentry.setUser({ email: 'test@mail.com', isAdmin: false });
