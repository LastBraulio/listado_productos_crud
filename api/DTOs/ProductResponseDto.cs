namespace api.DTOs;

public class ProductResponseDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public decimal Price { get; set; }

    public bool Status { get; set; }

    public string UserCreation { get; set; } = string.Empty;

    public DateTime CreationDate { get; set; }

    public string? UserModification { get; set; }

    public DateTime? ModificationDate { get; set; }
}