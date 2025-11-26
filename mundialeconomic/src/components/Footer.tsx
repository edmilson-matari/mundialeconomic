import { ShoppingCart } from "lucide-react";

export default function EcommerceFooter() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      {/* Main Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Marca + Informações de Contato */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <ShoppingCart className="h-10 w-10 text-orange-500" />
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Mundial Económico
                  </h3>
                  <p className="text-sm text-gray-400">
                    Comprar feito de maneira fácil
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-white">ENDEREÇO:</p>
                  <p className="mt-1">
                    Rua do Comércio, 123
                    <br />
                    Luanda, Angola
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-white">E-MAIL:</p>
                  <a
                    href="mailto:suporte@mundialeconomico.com"
                    className="hover:text-orange-400 transition"
                  >
                    suporte@mundialeconomico.com
                  </a>
                </div>

                <div>
                  <p className="font-semibold text-white">TELEFONE:</p>
                  <a
                    href="tel:+244923456789"
                    className="hover:text-orange-400 transition"
                  >
                    +244 923 456 789
                  </a>
                </div>
              </div>
            </div>

            {/* Minha Conta */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Minha Conta
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Minha Conta
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Lista de Desejos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Carrinho de Compras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Finalizar Compra
                  </a>
                </li>
              </ul>
            </div>

            {/* Informações */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Informações
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Sobre a Loja
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Mais Vendidos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Produtos em Destaque
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Fornecedores
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Compras Seguras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Entregas e Prazos
                  </a>
                </li>
              </ul>
            </div>

            {/* Suporte */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Suporte
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Contacte-nos
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Envios e Taxas
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Política de Devolução
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Carreiras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Afiliados
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Vale-Presente
                  </a>
                </li>
              </ul>
            </div>

            {/* Nossos Serviços */}
            <div>
              <h4 className="text-white font-bold text-lg mb-5 uppercase tracking-wider">
                Nossos Serviços
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Envios e Devoluções
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Compras Internacionais
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Melhor Suporte ao Cliente
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-orange-400 transition">
                    Troca Fácil
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2025 Mundial Económico. Todos os direitos reservados.
          </p>

          <div className="flex space-x-4">
            <img
              src="/payment/mastercard.svg"
              alt="Mastercard"
              className="h-8"
            />
            <img src="/payment/visa.svg" alt="Visa" className="h-8" />
            <img src="/payment/paypal.svg" alt="PayPal" className="h-8" />
            <img
              src="/payment/multicaixa.svg"
              alt="Multicaixa"
              className="h-8"
            />
            <img
              src="/payment/bank-transfer.svg"
              alt="Transferência Bancária"
              className="h-8"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
