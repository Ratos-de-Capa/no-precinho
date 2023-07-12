import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  @Input() productTest: any = {
    name: 'Smart TV LED 50 Samsung Crystal 4K HDR UN50AU7700GXZD',
    price: '2.199,00',
    portion: '12x de 162,89 com juros',
    img: 'https://source.unsplash.com/5WbYFH0kf_8',
    link: 'https://www.google.com/',
    subCategory: 'Eletronico',
    store: 'Amazon',
    category: 'Tv',
    description:
      'Aproveite a incrível experiência com este produto revolucionário. Combinando design elegante e desempenho excepcional, este produto vai transformar a forma como você realiza suas tarefas diárias. Seja você um profissional ou um entusiasta, este produto é perfeito para acompanhar seu estilo de vida ativo e exigente.',
    dataSheet: `Marca: XYZ
        Modelo: ABC123
        Cor: Preto
        Material: Plástico resistente
        Tamanho da tela: 5 polegadas
        Resolução da tela: 1920x1080 pixels
        Processador: Quad-core de 2.0 GHz
        Memória RAM: 4 GB
        Armazenamento interno: 64 GB
        Câmera traseira: 12 megapixels
        Câmera frontal: 8 megapixels
        Bateria: 3000 mAh
        Sistema operacional: FictOS v3.0
        Conectividade: Wi-Fi, Bluetooth 5.0, USB-C
        Recursos adicionais: Leitor de impressão digital, NFC`,
  };

  product = {
    link: 'https://www.amazon.com.br/sspa/click?ie=UTF8&spc=MTo4Mzc3NzY4NjUxMTgzNDQ0OjE2ODkwODIwNzU6c3BfYXRmOjIwMDAyNzAzODAyMTk5ODo6MDo6&url=%2FIphone-Apple-Branco-64gb-Desbloqueado%2Fdp%2FB08N1MG4VL%2Fref%3Dsr_1_1_sspa%3Fkeywords%3DiPhone%26qid%3D1689082075%26sr%3D8-1-spons%26ufe%3Dapp_do%253Aamzn1.fos.25548f35-0de7-44b3-b28e-0f56f3f96147%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1',
    coverImageSrc:
      'https://m.media-amazon.com/images/I/71kZfQA-Y7L._AC_UL320_.jpg',
    datasheet: [
      {
        key: 'Marca',
        value: 'Apple',
      },
      {
        key: 'Nome do modelo',
        value: 'iPhone 11',
      },
      {
        key: 'Operadora de celulares e tecnologia sem fio',
        value: 'Desbloqueado',
      },
      {
        key: 'Sistema operacional',
        value: 'iOS 14',
      },
      {
        key: 'Tecnologia celular',
        value: '4G',
      },
    ],
    description: null,
    imagesSrc: [
      'https://m.media-amazon.com/images/I/41TS0WBcr0L._AC_SR38,50_.jpg',
      'https://m.media-amazon.com/images/I/31ZJErre2SL._AC_SR38,50_.jpg',
      'https://m.media-amazon.com/images/I/41SfLF967UL._AC_SR38,50_.jpg',
      'https://m.media-amazon.com/images/I/41s8irt1e2L._AC_SR38,50_.jpg',
      'https://m.media-amazon.com/images/I/31XQAgqxm5L._AC_SR38,50_.jpg',
      'https://m.media-amazon.com/images/I/615reCVL-NL._SX35_SY46._CR0,0,35,46_BG85,85,85_BR-120_PKdp-play-icon-overlay__.jpg',
    ],
    name: 'Apple iPhone 11 (64 GB) Branco',
    origin: 'amazon',
    paymentDetails: 'até 10x de R$ 309,90 sem juros',
    percentOff: Number(10),
    price: 2789.1,
    reviews: {
      rating: 4.8,
      evaluations: Number(14628),
    },
  };

  id: string;
  // product: any;
  relatedProducts: any[];
  currentRate = 3.5;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.updateProduct();
  }

  async updateProduct() {
    try {
      const res = await this.purchaseService.getProductById(this.id);

      if(!res) {
        this.redirectToHome();
        return;
      }

      this.product = res;

    } catch (error) {
      console.log(error);
    }
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

}
