# NestJS simple microservice with TCP transport

- ticket service (http and microservice hybrid app)

  - send a post request to http://localhost:3000/ticket
  - it will send a message to payment service with a payload

  ```
    // this will send ticketObj and get back some data from payment service
    return lastValueFrom(this.paymentClient.send('doPayment', ticketObj))
  ```

- payment service (only micro service)
  - recieve a message from ticket service with @MessagePattern('doPayment')
  - after reciving the message it will emit an event to ticket service as a {success:true}
  ```
     this.ticketClient.emit('payment_sucess', { success: true });
  ```
  - and finally return `{ status: true };` form doPayment message pattern funcation.
