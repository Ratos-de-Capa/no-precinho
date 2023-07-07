import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})




export class PurchaseComponent implements OnInit {

  @Input() productTest: any = 
      {
        name: "Smart TV LED 50 Samsung Crystal 4K HDR UN50AU7700GXZD",
        price: "2.199,00",
        portion: "12x de 162,89 com juros",
        img: "https://source.unsplash.com/5WbYFH0kf_8",
        link:"https://www.google.com/",
        subCategory: "Eletronico",
        store: "Amazon",
        category: "Tv",
        description: "Aproveite a incrível experiência com este produto revolucionário. Combinando design elegante e desempenho excepcional, este produto vai transformar a forma como você realiza suas tarefas diárias. Seja você um profissional ou um entusiasta, este produto é perfeito para acompanhar seu estilo de vida ativo e exigente.",
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
        Recursos adicionais: Leitor de impressão digital, NFC`
  
      }
    

  id: number;
  product: any;
  relatedProducts: any[];


  constructor(
    private route: ActivatedRoute
    // private apiService: apiService
    ) {}


  


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
 
    // this.apiService.getProductById(this.id).subscribe((res)=>{
    //   this.product = res;
    // });

    // this.apiService.getProductByCategory(product.category, 5).subscribe((res)=>{
    //   this.relatedProducts = res;
    // });
  }
  

    
}
