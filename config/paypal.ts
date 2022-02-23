const config = {
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
  intent: "capture",
  currency: "USD",
};

export default config;
