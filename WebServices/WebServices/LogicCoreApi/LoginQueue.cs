using System;
using System.Collections.Generic;
using System.Text;

using Azure.Messaging.ServiceBus;
using Entities;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;

namespace LogicCoreApi
{
    public class LoginQueue
    {

        static string connectionString = "Endpoint=sb://brighturequeue.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=iAM3JO+ly1dUc1mM3qQ0CKniyOs2gH5n+o07+3M4ZxE=";
        static string queueName = "queueservicebus";
        static string queueNameUI = "queueserviceui";

        static UsuarioManager manager;
        public LoginQueue()
        {
            manager = new UsuarioManager();
        }

        public async Task iniciarQueue()
        {
            await ReceiveMessagesAsync();
        }

        static async Task SendMessageAsync(BaseEntity userItem)
        {
            // create a Service Bus client 
            await using (ServiceBusClient client = new ServiceBusClient(connectionString))
            {
                // create a sender for the queue 
                ServiceBusSender sender = client.CreateSender(queueNameUI);
                // create a message that we can send                
                string user = JsonConvert.SerializeObject(userItem);
                ServiceBusMessage message = new ServiceBusMessage(Encoding.UTF8.GetBytes(user));
                // send the message
                await sender.SendMessageAsync(message);
               
            }
        }

        //static Queue<ServiceBusMessage> CreateMessages()
        //{
        //    // create a queue containing the messages and return it to the caller
        //    Queue<ServiceBusMessage> messages = new Queue<ServiceBusMessage>();
        //    messages.Enqueue(new ServiceBusMessage("First message in the batch"));
        //    return messages;
        //}

        //static async Task SendMessageBatchAsync()
        //{
        //    // create a Service Bus client 
        //    await using (ServiceBusClient client = new ServiceBusClient(connectionString))
        //    {
        //        // create a sender for the queue 
        //        ServiceBusSender sender = client.CreateSender(queueName);

        //        // get the messages to be sent to the Service Bus queue
        //        Queue<ServiceBusMessage> messages = CreateMessages();

        //        // total number of messages to be sent to the Service Bus queue
        //        int messageCount = messages.Count;

        //        // while all messages are not sent to the Service Bus queue
        //        while (messages.Count > 0)
        //        {
        //            // start a new batch 
        //            using ServiceBusMessageBatch messageBatch = await sender.CreateMessageBatchAsync();

        //            // add the first message to the batch
        //            if (messageBatch.TryAddMessage(messages.Peek()))
        //            {
        //                // dequeue the message from the .NET queue once the message is added to the batch
        //                messages.Dequeue();
        //            }
        //            else
        //            {
        //                // if the first message can't fit, then it is too large for the batch
        //                throw new Exception($"Message {messageCount - messages.Count} is too large and cannot be sent.");
        //            }

        //            // add as many messages as possible to the current batch
        //            while (messages.Count > 0 && messageBatch.TryAddMessage(messages.Peek()))
        //            {
        //                // dequeue the message from the .NET queue as it has been added to the batch
        //                messages.Dequeue();
        //            }

        //            // now, send the batch
        //            await sender.SendMessagesAsync(messageBatch);

        //            // if there are any remaining messages in the .NET queue, the while loop repeats 
        //        }

        //        Console.WriteLine($"Sent a batch of {messageCount} messages to the topic: {queueName}");
        //    }
        //}

        static async Task MessageHandler(ProcessMessageEventArgs args)
        {

            Usuario user = JsonConvert.DeserializeObject<Usuario>(Encoding.UTF8.GetString(args.Message.Body));

            Usuario bs = manager.AuthenticateLogIn(user);

            Console.WriteLine(bs);

            await SendMessageAsync(bs);

            // complete the message. messages is deleted from the queue. 
            await args.CompleteMessageAsync(args.Message);
        }

        // handle any errors when receiving messages
        static Task ErrorHandler(ProcessErrorEventArgs args)
        {
            Console.WriteLine(args.Exception.ToString());
            return Task.CompletedTask;
        }

        static async Task ReceiveMessagesAsync()
        {
            await using (ServiceBusClient client = new ServiceBusClient(connectionString))
            {
                // create a processor that we can use to process the messages
                ServiceBusProcessor processor = client.CreateProcessor(queueName, new ServiceBusProcessorOptions());
                // add handler to process messages
                processor.ProcessMessageAsync += MessageHandler;
                // add handler to process any errors
                processor.ProcessErrorAsync += ErrorHandler;
                await processor.StartProcessingAsync(); 
            }
        }

    }
}
