using System;
using System.Collections.Generic;
using CrudApi;
using Entities;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace LogicCoreApi
{
    public class UsuarioManager:CoreManager
    {

        private UsuarioCrud crud;

        public UsuarioManager()
        {
            this.crud = new UsuarioCrud();
        }

        public List<Usuario> RetrieveAll()
        {
            List<Usuario> usuarios = crud.Retrieve<Usuario>();

            if (usuarios != null)
                return usuarios;
            return usuarios;
        }

        public Usuario RetrieveById(BaseEntity usuario)
        {
            Usuario user = crud.RetrieveById<Usuario>(usuario);
            if (user != null)
            {
                return user;
            }

            throw new Exception();
        }

        public void Create(BaseEntity usuario)
        {
            crud.CreateAsync(usuario);
        }

        public void Update(BaseEntity usuario)
        {
            crud.Update(usuario);
        }

        public void Delete(BaseEntity usuario)
        {
            crud.Delete(usuario);
        }

        public Usuario AuthenticateLogIn(Usuario item)
        {
            List<Usuario> usuarios = RetrieveAll();
            foreach(var user in usuarios)
            {
                if (user.CorreoElectronico == item.CorreoElectronico && user.Contrasenna == item.Contrasenna)
                {
                    return user;
                }
            }
            return null;
        }

        public void ActualizarContrasenna(Usuario user) {
            List<Usuario> usuarios = RetrieveAll();
            foreach (var data in usuarios)
            {
                if (data.CorreoElectronico == user.CorreoElectronico)
                {
                    data.Contrasenna = user.Contrasenna;
                    crud.Update(data);
                }
            }
        }

        public static async Task EnviarMail(Usuario user)
        {
            string psw = GenerarCodigoVerificacion();
            user.Contrasenna = psw;
            UsuarioManager manager = new UsuarioManager();
            manager.ActualizarContrasenna(user);

            var apiKey = "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";
            var client = new SendGridClient(apiKey);
            var from = new EmailAddress("eve.se.na25@gmail.com", "Brighture");
            var subject = "Recuperación de contraseña para Brighture";
            var to = new EmailAddress(user.CorreoElectronico, user.Nombre);
            var plainTextContent = ("Su codigo de verificación es: "+psw+".");
            var htmlContent = "<strong>Su codigo de verificación es: (" + psw + ").</strong>";
            var msg = MailHelper.CreateSingleEmail(from, to, subject, plainTextContent, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        private static string GenerarCodigoVerificacion()
        {
            char[] str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();
            string pwd = "";
            for (int i = 0; i < 8; i++) pwd += str[new Random().Next(62)];
            return pwd;
        }

        public bool EliminarCuenta(Usuario user)
        {
            return true;
        }
    }
}
