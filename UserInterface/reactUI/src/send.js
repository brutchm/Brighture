const { ServiceBusClient } = require("@azure/service-bus");

// connection string to your Service Bus namespace
const connectionString = "Endpoint=sb://brighturequeue.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=iAM3JO+ly1dUc1mM3qQ0CKniyOs2gH5n+o07+3M4ZxE="

// name of the queue
const queueName = "queueservicebus"

const messages =[ { 
      body: {
          correoElectronico: "prubea@gmail.com",
          contrasenna: "12345678" 
      }}
]
 ;

async function main() {
	// create a Service Bus client using the connection string to the Service Bus namespace
	const sbClient = new ServiceBusClient(connectionString);

	// createSender() can also be used to create a sender for a topic.
	const sender = sbClient.createSender(queueName);

	try {
		// Tries to send all messages in a single batch.
		// Will fail if the messages cannot fit in a batch.
		// await sender.sendMessages(messages);

		// create a batch object
		let batch = await sender.createMessageBatch(); 
		for (let i = 0; i < messages.length; i++) {
			// for each message in the arry			

			// try to add the message to the batch
			if (!batch.tryAddMessage(messages[i])) {			
				// if it fails to add the message to the current batch
				// send the current batch as it is full
				await sender.sendMessages(batch);

				// then, create a new batch 
				batch = await sender.createBatch();

				// now, add the message failed to be added to the previous batch to this batch
				if (!batch.tryAddMessage(messages[i])) {
					// if it still can't be added to the batch, the message is probably too big to fit in a batch
					throw new Error("Message too big to fit in a batch");
				}
			}
		}

		// Send the last created batch of messages to the queue
		await sender.sendMessages(batch);

		console.log(`Sent a batch of messages to the queue: ${queueName}`);

		// Close the sender
		await sender.close();
	} finally {
		await sbClient.close();
	}
}

// call the main function
main().catch((err) => {
	console.log("Error occurred: ", err);
	process.exit(1);
 });