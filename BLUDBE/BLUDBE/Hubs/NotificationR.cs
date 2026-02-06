using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RKPD.API.Hubs
{
    public class NotificationR : Hub
    {
        private readonly IHubContext<NotificationR> _hub;
        public NotificationR(IHubContext<NotificationR> hubContext)
        {
            _hub = hubContext;
        }
        //public void Notif(string Message)
        //{
        //    _hub.Clients.All.SendAsync("notif", Message);
        //}
    }
}
