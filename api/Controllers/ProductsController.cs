using api.Data;
using api.Models;
using api.DTOs;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using System.Security.Claims;

using api.Documents;
using QuestPDF.Fluent;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    /*[HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _context.Products.ToListAsync();

        return Ok(products);
    }*/
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ProductFilterDto filter)
    {
        var query = _context.Products.AsQueryable();

        // Buscar por nombre o descripción
        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var search = filter.Search.Trim().ToLower();

            query = query.Where(x =>
                x.Name.ToLower().Contains(search) ||
                (x.Description != null &&
                x.Description.ToLower().Contains(search)));
        }

        // Estado
        if (filter.Status.HasValue)
        {
            query = query.Where(x =>
                x.Status == filter.Status.Value);
        }

        // Precio mínimo
        if (filter.MinPrice.HasValue)
        {
            query = query.Where(x =>
                x.Price >= filter.MinPrice.Value);
        }

        // Precio máximo
        if (filter.MaxPrice.HasValue)
        {
            query = query.Where(x =>
                x.Price <= filter.MaxPrice.Value);
        }

        // Ordenamiento
        switch (filter.SortBy?.ToLower())
        {
            case "name":
                query = filter.Descending
                    ? query.OrderByDescending(x => x.Name)
                    : query.OrderBy(x => x.Name);
                break;

            case "price":
                query = filter.Descending
                    ? query.OrderByDescending(x => x.Price)
                    : query.OrderBy(x => x.Price);
                break;

            case "createdate":
                query = filter.Descending
                    ? query.OrderByDescending(x => x.CreationDate)
                    : query.OrderBy(x => x.CreationDate);
                break;

            default:
                query = query.OrderBy(x => x.Name);
                break;
        }

        var totalRecords = await query.CountAsync();

        var products = await query
            .Skip((filter.Page - 1) * filter.PageSize)
            .Take(filter.PageSize)
            .Select(x => new ProductResponseDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                Price = x.Price,
                Status = x.Status,
                UserCreation = x.UserCreation,
                CreationDate = x.CreationDate,
                UserModification = x.UserModification,
                ModificationDate = x.ModificationDate
            })
            .ToListAsync();

        var result = new PagedResultDto<ProductResponseDto>
        {
            Data = products,
            Page = filter.Page,
            PageSize = filter.PageSize,
            TotalRecords = totalRecords,
            TotalPages = (int)Math.Ceiling(
                totalRecords / (double)filter.PageSize)
        };

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
            return NotFound();

        return Ok(product);
    }

    /*[HttpPost]
    public async Task<IActionResult> Create(Product model)
    {
        model.Id = Guid.NewGuid();

        model.CreationDate = DateTime.UtcNow;

        _context.Products.Add(model);

        await _context.SaveChangesAsync();

        return Ok(model);
    }*/

    [HttpPost]
    public async Task<IActionResult> Create(ProductCreateDto dto)
    {
        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            Description = dto.Description,
            Price = dto.Price,
            Status = dto.Status,

            UserCreation = userId ?? "",

            CreationDate = DateTime.UtcNow
        };

        _context.Products.Add(product);

        await _context.SaveChangesAsync();

        return Ok(product);
    }

    /*[HttpPut("{id}")]
    public async Task<IActionResult> Update(
        Guid id,
        Product model)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
            return NotFound();

        product.Name = model.Name;
        product.Description = model.Description;
        product.Price = model.Price;
        product.Status = model.Status;

        product.ModificationDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(product);
    }*/

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        Guid id,
        ProductUpdateDto dto)
    {
        var product =
            await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
            return NotFound();

        var userId =
            User.FindFirstValue(
                ClaimTypes.NameIdentifier);

        product.Name = dto.Name;
        product.Description = dto.Description;
        product.Price = dto.Price;
        product.Status = dto.Status;

        product.UserModification = userId;

        product.ModificationDate =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(product);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _context.Products
            .FirstOrDefaultAsync(x => x.Id == id);

        if (product == null)
            return NotFound();

        _context.Products.Remove(product);

        await _context.SaveChangesAsync();

        return NoContent();
    }
    //report
    [HttpGet("report/pdf")]
    public async Task<IActionResult> GeneratePdf()
    {
        var products = await _context.Products
            .OrderBy(x => x.Name)
            .ToListAsync();

        var document =
            new ProductReportDocument(products);

        var pdf = document.GeneratePdf();

        return File(
            pdf,
            "application/pdf",
            $"products-{DateTime.Now:yyyyMMdd}.pdf");
    }
}