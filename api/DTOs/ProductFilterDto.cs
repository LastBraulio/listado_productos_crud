namespace api.DTOs;

public class ProductFilterDto
{
    public string? Search { get; set; }

    public bool? Status { get; set; }

    public decimal? MinPrice { get; set; }

    public decimal? MaxPrice { get; set; }

    public string? SortBy { get; set; }

    public bool Descending { get; set; } = false;

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;
}