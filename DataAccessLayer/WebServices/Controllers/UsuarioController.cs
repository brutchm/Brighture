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
    public class UsuarioController : ControllerBase
    {
        private readonly IDocumentClient _documentClient;
        readonly string databaseId;
        readonly string collectionId;
        public IConfiguration Configuration { get; }
        //esto es una prueba


        public UsuarioController(IDocumentClient documentClient, IConfiguration configuration)
        {
            _documentClient = documentClient;
            Configuration = configuration;

            databaseId = Configuration["DatabaseId"];
            collectionId = "USUARIO";

            BuildCollection().Wait();
        }

        private async Task BuildCollection()
        {
            await _documentClient.CreateDatabaseIfNotExistsAsync(new Database { Id = databaseId });
            await _documentClient.CreateDocumentCollectionIfNotExistsAsync(UriFactory.CreateDatabaseUri(databaseId), new DocumentCollection { Id = collectionId });
        }

        [HttpGet]
        public IQueryable<Usuario> Get()
        {
            return _documentClient.CreateDocumentQuery<Usuario>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 20 });
        }

        [HttpGet("{id}")]
        public IQueryable<Usuario> Get(string id)
        {
            return _documentClient.CreateDocumentQuery<Usuario>(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId),
                new FeedOptions { MaxItemCount = 1 }).Where((i) => i.id == id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario item)
        {
            var response = await _documentClient.CreateDocumentAsync(UriFactory.CreateDocumentCollectionUri(databaseId, collectionId), item);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] Usuario item)
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