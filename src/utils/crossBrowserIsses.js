fetch('/fake-url');

export const paymentRequest = new PaymentRequest();

export const cbToPromise = fn => new Promise((resolve, reject) => fn(resolve, reject));
