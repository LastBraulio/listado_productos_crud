using api.Models;
using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;

namespace api.Documents;

public class ProductReportDocument : IDocument
{
    private readonly List<Product> _products;

    public ProductReportDocument(
        List<Product> products)
    {
        _products = products;
    }

    public DocumentMetadata GetMetadata()
        => DocumentMetadata.Default;

    public void Compose(IDocumentContainer container)
    {
        container.Page(page =>
        {
            page.Margin(30);

            page.Header()
                .Text("Reporte de Productos")
                .FontSize(20)
                .Bold();

            page.Content()
                .PaddingVertical(10)
                .Table(table =>
                {
                    table.ColumnsDefinition(columns =>
                    {
                        columns.RelativeColumn(2);
                        columns.RelativeColumn(3);
                        columns.RelativeColumn(1);
                        columns.RelativeColumn(1);
                        columns.RelativeColumn(2);
                    });

                    table.Header(header =>
                    {
                        header.Cell().Text("Nombre").Bold();
                        header.Cell().Text("Descripción").Bold();
                        header.Cell().Text("Precio").Bold();
                        header.Cell().Text("Estado").Bold();
                        header.Cell().Text("Fecha de Creación").Bold();
                    });

                    foreach (var product in _products)
                    {
                        table.Cell().Text(product.Name);

                        table.Cell().Text(
                            product.Description ?? "");

                        table.Cell().Text(
                            product.Price.ToString("C"));
                        table.Cell().Text(
                            product.Status ? "Activo" : "Inactivo");

                        table.Cell().Text(
                            product.CreationDate
                            .ToString("dd/MM/yyyy"));
                    }
                });

            page.Footer()
                .AlignCenter()
                .Text(x =>
                {
                    x.Span("Página ");
                    x.CurrentPageNumber();
                });
        });
    }
}