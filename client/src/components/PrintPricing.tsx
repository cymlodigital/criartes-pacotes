import { Send } from "lucide-react";

type PriceRow = { pages: number; price: string };
type PaperPriceList = {
  name: string;
  prices: PriceRow[];
  extraPagePrice?: string;
};
type PrintFormat = { size: string; papers: PaperPriceList[] };

type PrintPricingProps = {
  onSelectPackage: (packageName: string) => void;
};

const printFormats: PrintFormat[] = [
  {
    size: "16 × 24 cm",
    papers: [
      {
        name: "Offset/Branco",
        prices: [
          { pages: 60, price: "6.000 KZ" },
          { pages: 70, price: "7.500 KZ" },
          { pages: 90, price: "8.200 KZ" },
          { pages: 110, price: "9.100 KZ" },
          { pages: 150, price: "10.500 KZ" },
          { pages: 200, price: "14.500 KZ" },
        ],
      },
      {
        name: "Pólen",
        prices: [
          { pages: 60, price: "7.500 KZ" },
          { pages: 70, price: "9.500 KZ" },
          { pages: 90, price: "10.100 KZ" },
          { pages: 110, price: "11.000 KZ" },
          { pages: 150, price: "13.500 KZ" },
          { pages: 200, price: "16.500 KZ" },
        ],
      },
    ],
  },
  {
    size: "A5 (14 × 21 cm)",
    papers: [
      {
        name: "Offset/Branco",
        extraPagePrice: "Página avulsa: 70 KZ/pág.",
        prices: [
          { pages: 60, price: "4.900 KZ" },
          { pages: 70, price: "5.500 KZ" },
          { pages: 90, price: "6.500 KZ" },
          { pages: 110, price: "7.000 KZ" },
          { pages: 150, price: "8.000 KZ" },
          { pages: 200, price: "8.500 KZ" },
        ],
      },
      {
        name: "Pólen",
        extraPagePrice: "Página avulsa: 90 KZ/pág.",
        prices: [
          { pages: 60, price: "6.000 KZ" },
          { pages: 70, price: "7.500 KZ" },
          { pages: 90, price: "8.200 KZ" },
          { pages: 110, price: "9.100 KZ" },
          { pages: 150, price: "10.500 KZ" },
          { pages: 200, price: "12.500 KZ" },
        ],
      },
    ],
  },
];

export default function PrintPricing({ onSelectPackage }: PrintPricingProps) {
  return (
    <section className="print-section" id="impressao" aria-labelledby="print-title">
      <div className="print-section-heading">
        <p className="package-eyebrow">FORMATO, PAPEL E TIRAGEM</p>
        <h2 id="print-title">Pacote de impressão</h2>
        <p>Compare os formatos e escolha o papel ideal para o seu livro.</p>
      </div>

      <div className="print-format-grid">
        {printFormats.map((format) => (
          <article className="print-format-card" key={format.size}>
            <h3 className="print-format-heading">Tamanho <span>{format.size}</span></h3>
            <div className="print-paper-grid">
              {format.papers.map((paper) => (
                <section className="print-paper-card" key={paper.name} aria-label={`${format.size}, papel ${paper.name}`}>
                  <h4 className="print-paper-heading">Papel {paper.name}</h4>
                  <table className="print-price-table">
                    <caption className="sr-only">Preços de impressão em {format.size}, papel {paper.name}</caption>
                    <thead>
                      <tr><th scope="col">Páginas</th><th scope="col">Preço</th></tr>
                    </thead>
                    <tbody>
                      {paper.prices.map((row) => (
                        <tr key={row.pages}>
                          <th scope="row">{row.pages} páginas</th>
                          <td>{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {paper.extraPagePrice && <p className="print-extra-page">{paper.extraPagePrice}</p>}
                  <button
                    className="print-quote-button"
                    type="button"
                    onClick={() => onSelectPackage(`Impressão ${format.size} · ${paper.name}`)}
                  >
                    Pedir orçamento <Send size={14} />
                  </button>
                </section>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="print-material-note">
        <p><strong>Offset/Branco:</strong> branco, económico e ideal para grandes volumes.</p>
        <p><strong>Pólen:</strong> creme premium, com maior conforto visual.</p>
      </div>
    </section>
  );
}
