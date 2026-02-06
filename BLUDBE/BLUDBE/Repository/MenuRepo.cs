using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using RKPD.API.Helpers;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class MenuRepo : Repo<Webrole>, IMenuRepo
    {
        private readonly IMapper _mapper;
        public MenuRepo(DbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
        }
        public BludContext _BludContext => _context as BludContext;
        public async Task<List<Menu>> GetMenuAdmin(long Idapp)
        {
            var models = await _BludContext.Webrole
                .Where(w => (w.Parentid == null || w.Parentid == "") && w.Show == 1 && w.Idapp == Idapp)
                .OrderBy(o => o.Roleid)
                .Select(s => new Menu
                {
                    Icon = s.Icon != null ? s.Icon : "",
                    RoleId = s.Roleid.Trim(),
                    Label = s.Role,
                    RouterLink = ReplaceLink(s.Link),
                    ParentId = s.Parentid,
                    MenuId = s.Menuid
                }).ToListAsync();
            models.ForEach(x => PopulateChildren(x, Idapp));
            return models;
        }
        private void PopulateChildren(Menu parent, long Idapp)
        {
            var query = _BludContext.Webrole
              .Where(a => a.Parentid == parent.MenuId && a.Show == 1 && a.Idapp == Idapp)
              .OrderBy(a => a.Roleid)
              .Select(a => new Menu
              {
                  RoleId = a.Roleid.Trim(),
                  Icon = a.Icon != null ? a.Icon : "",
                  RouterLink = ReplaceLink(a.Link),
                  ParentId = a.Parentid,
                  Label = a.Role,
                  MenuId = a.Menuid
              })
              .AsQueryable();
            var children = query.ToList();
            parent.Items = children;
            parent.Items.ForEach(child => PopulateChildren(child, Idapp));
        }
        public async Task<List<Menu>> GetMenuByGroupId(long groupid, long Idapp)
        {
            List<string> listRoleId = await _BludContext.Webotor
                .Where(w => w.Groupid == groupid)
                .OrderBy(o => o.Roleid)
                .Select(s => s.Roleid).ToListAsync();
            if (listRoleId.Count() == 0)
                return new List<Menu> { };
            List<Menu> menus = await _BludContext.Webrole
                .Where(w => (w.Parentid == null || w.Parentid == "") && w.Show == 1 && listRoleId.Contains(w.Roleid) && w.Idapp == Idapp)
                .OrderBy(o => o.Roleid)
                .Select(s => new Menu
                {
                    Icon = s.Icon != null ? s.Icon : "",
                    RoleId = s.Roleid.Trim(),
                    Label = s.Role,
                    RouterLink = ReplaceLink(s.Link),
                    ParentId = s.Parentid,
                    MenuId = s.Menuid
                }).ToListAsync();
            menus.ForEach(x => PopulateChildrenByGroupId(x, listRoleId, Idapp));
            return menus;
        }
        private void PopulateChildrenByGroupId(Menu parent, List<string> roleIds, long Idapp)
        {
            List<Menu> TempChild = _BludContext.Webrole
                  .Where(a => a.Parentid == parent.MenuId && a.Show == 1 && roleIds.Contains(a.Roleid) && a.Idapp == Idapp)
                  .OrderBy(a => a.Roleid)
                  .Select(a => new Menu
                  {
                      RoleId = a.Roleid.Trim(),
                      Icon = a.Icon != null ? a.Icon : "",
                      RouterLink = ReplaceLink(a.Link),
                      ParentId = a.Parentid,
                      Label = a.Role,
                      MenuId = a.Menuid
                  })
                  .ToList();
            parent.Items = TempChild;
            parent.Items.ForEach(child => PopulateChildrenByGroupId(child, roleIds, Idapp));
        }

        public async Task<List<MenuTreeDto>> TreeMenuWeRole(long groupid)
        {
            List<string> listRoleId = new List<string>();
            List<Webotor> webotors = await _BludContext.Webotor
                .Where(w => w.Groupid == groupid)
                .OrderBy(o => o.Roleid)
                .Select(s => s).ToListAsync();
            var listOtor = _mapper.Map<List<WebOtorViewDto>>(webotors);
            foreach (var d in listOtor)
            {
                listRoleId.Add(d.Roleid.Trim());
            }
            var existRoleChildSelected = new List<Webrole> { };
            for (var i = 0; i < listRoleId.Count(); i++)
            {
                Webrole check = _BludContext.Webrole
                    .Where(w => w.Roleid.Trim() == listRoleId[i] && w.Show == 1 && w.Idapp == 4)
                    .Select(s => s).FirstOrDefault();
                var checkParent = _BludContext.Webrole
                    .Where(w => w.Parentid.Trim() == check.Menuid.Trim() && w.Idapp == 4).FirstOrDefault();
                if (checkParent == null)
                    existRoleChildSelected.Add(check);

            }
            List<string> childRoleIdUsed = new List<string>();
            if (existRoleChildSelected.Count() > 0)
            {
                foreach (var s in existRoleChildSelected)
                {
                    childRoleIdUsed.Add(s.Roleid.Trim());
                }
            }
            var models = await _BludContext.Webrole
                .Where(w => (w.Parentid == null || w.Parentid == "") && w.Show == 1 && w.Idapp == 4)
                .OrderBy(o => o.Roleid)
                .Select(s => new MenuTreeDto
                {
                    label = s.Role.Trim(),
                    data = s.Roleid.Trim(),
                    expandedIcon = "fa fa-folder-open",
                    collapsedIcon = "fa fa-folder",
                    RoleId = s.Roleid.Trim(),
                    RouterLink = ReplaceLink(s.Link),
                    ParentId = s.Parentid,
                    MenuId = s.Menuid
                }).ToListAsync();
            models.ForEach(x => PopulateChildrenTree(x, childRoleIdUsed));
            return models;
        }
        private void PopulateChildrenTree(MenuTreeDto parent, List<string> roleIds)
        {
            List<MenuTreeDto> tempChild = new List<MenuTreeDto> { };
            if (roleIds.Count() > 0)
            {
                for (var i = 0; i < roleIds.Count(); i++)
                {
                    var query = _BludContext.Webrole
                      .Where(a => a.Parentid == parent.MenuId && a.Roleid != roleIds[i] && a.Show == 1 && a.Idapp == 4)
                      .OrderBy(a => a.Roleid)
                      .Select(a => new MenuTreeDto
                      {
                          label = a.Role.Trim(),
                          data = a.Roleid.Trim(),
                          expandedIcon = "fa fa-folder-open",
                          collapsedIcon = "fa fa-folder",
                          RoleId = a.Roleid.Trim(),
                          RouterLink = ReplaceLink(a.Link),
                          ParentId = a.Parentid,
                          MenuId = a.Menuid
                      })
                      .AsQueryable();
                    tempChild = query.ToList();
                }

            }
            else
            {
                var query = _BludContext.Webrole
                  .Where(a => a.Parentid == parent.MenuId && a.Show == 1 && a.Idapp == 4)
                  .OrderBy(a => a.Roleid)
                  .Select(a => new MenuTreeDto
                  {
                      label = a.Role.Trim(),
                      data = a.Roleid.Trim(),
                      expandedIcon = "fa fa-folder-open",
                      collapsedIcon = "fa fa-folder",
                      RoleId = a.Roleid.Trim(),
                      RouterLink = ReplaceLink(a.Link),
                      ParentId = a.Parentid,
                      MenuId = a.Menuid
                  })
                  .AsQueryable();
                tempChild = query.ToList();
            }

            parent.children = tempChild;
            parent.children.ForEach(child => PopulateChildrenTree(child, roleIds));
        }
        private string ReplaceLink(string link)
        {
            if (link != null) return link.Trim().Replace(" ", "-").ToLower();
            return link;
        }
    }
}
