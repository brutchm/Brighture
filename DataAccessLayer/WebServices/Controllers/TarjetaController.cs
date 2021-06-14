using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;
using WebServices.Models;

namespace WebServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TarjetaController : ControllerBase
    {
        private readonly IDocumentClient _documentClient;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }


        public TarjetaController(IDocumentClient documentClient, IConfiguration configuration)
        {
            _documentClient = documentClient;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "TARJETA";

            BuildCollection().Wait();
        }

        private async Task BuildCollection()
        {
            await _documentClient.CreateDatabaseIfNotExistsAsync(new Database { Id = databaseId });
            await _documentClient.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(databaseId), new DocumentCollection { Id = collectionId });
        }


        [HttpGet]
        public IQueryable<Tarjeta> Get()
        {
            return _documentClient.CreateDocumentQuery<Tarjeta>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 20 });
        }

        [HttpGet("{idtar}")]
        public IQueryable<Tarjeta> Get(string idtar)
        {
            return _documentClient.CreateDocumentQuery<Tarjeta>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 1 }).Where((i) => i.id == idtar);
        }

      
       
        [HttpGet("TarjetaByUserId/{id}")]
        public IQueryable<Tarjeta> GetByUserId(string id)
        {
            return _documentClient.CreateDocumentQuery<Tarjeta>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 1000 }).Where((i) =>  i.IdUsuario == id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Tarjeta item)
        {
            var response = await _documentClient.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseId,collectionId), item);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Tarjeta item)
        {
            item.id = id;
            await _documentClient.ReplaceDocumentAsync(UriFactory.CreateDocumentUri(databaseId, collectionId, id), item);

            return Ok();
           
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            await _documentClient.DeleteDocumentAsync(UriFactory.CreateDocumentUri(databaseId, collectionId, id));
            return Ok();
        }
    }
}
