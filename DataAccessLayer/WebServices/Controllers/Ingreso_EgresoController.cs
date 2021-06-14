using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Extensions.Configuration;

namespace DataAccessLayer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Ingreso_EgresoController : ControllerBase
    {
        private readonly IDocumentClient _documentClient;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }


        public Ingreso_EgresoController(IDocumentClient documentClient, IConfiguration configuration)
        {
            _documentClient = documentClient;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "INGRESO_EGRESO";

            BuildCollection().Wait();
        }

        private async Task BuildCollection()
        {
            await _documentClient.CreateDatabaseIfNotExistsAsync(new Database { Id = databaseId });
            await _documentClient.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(databaseId), new DocumentCollection { Id = collectionId });
        }

        [HttpGet]
        public IQueryable<Ingreso_Egreso> Get()
        {
            return _documentClient.CreateDocumentQuery<Ingreso_Egreso>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 20 });
        }

        [HttpGet("{id}")]
        public IQueryable<Ingreso_Egreso> Get(string id)
        {
            return _documentClient.CreateDocumentQuery<Ingreso_Egreso>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 1 }).Where((i) => i.id == id);
        }



        [HttpGet("TransaccionByUserId/{id}")]
        public IQueryable<Ingreso_Egreso> GetByUserId(string id)
        {
            return _documentClient.CreateDocumentQuery<Ingreso_Egreso>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 1 }).Where((i) => i.Usuario == id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ingreso_Egreso item)
        {
            var response = await _documentClient.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId), item);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Ingreso_Egreso item)
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