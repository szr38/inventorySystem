import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { product, productProcess } from 'src/app/shared/interface/product.interface';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'image', 'price', 'netWorht'];
  dataSource: MatTableDataSource<productProcess>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  product: productProcess[];
  filter: string = '';
  searchQuantity: number = 0;
  searchPrice: number = 0;
  searchNetWorth: number =0;

  advanceFilter = false;

  constructor() {
    this.product = this.informationStatic.map(obj => {
      return {
        ...obj,
        netWorht: obj.price * obj.quantity
      }
    });
    this.dataSource = new MatTableDataSource(this.product);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  onButtonFilter() {
    this.advanceFilter = !this.advanceFilter;
  }

  onReset(){
    this.filter = '';
    this.searchQuantity = 0;
    this.searchPrice = 0;
    this.searchNetWorth =0;
    this.dataSource.data=this.product;
  }

  formatLabel(value: number) {
    return '>' + value;
  }

  applyFilterSearch() {
    const search = this.filter.trim().toLowerCase();
    let tempData = this.product.filter(data => data.name.toLowerCase().includes(search));
    tempData = tempData.filter(data => data.quantity >= this.searchQuantity);
    tempData = tempData.filter(data => data.price >= this.searchPrice);
    tempData = tempData.filter(data => data.netWorht >= this.searchNetWorth);
    this.dataSource.data = tempData;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getTotalCost() {
    return this.dataSource.data.map(t => t.netWorht).reduce((acc, value) => acc + value, 0);
  }







  informationStatic = [
    { "name": "Ninox superciliaris", "quantity": 31, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 27.16 },
    { "name": "Pandon haliaetus", "quantity": 81, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 43.56 },
    { "name": "Chordeiles minor", "quantity": 4, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 75.13 },
    { "name": "Terrapene carolina", "quantity": 74, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 171.75 },
    { "name": "Lama guanicoe", "quantity": 95, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 229.17 },
    { "name": "Lepus arcticus", "quantity": 54, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 6.05 },
    { "name": "Paraxerus cepapi", "quantity": 29, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 43.17 },
    { "name": "Felis yagouaroundi", "quantity": 52, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 129.69 },
    { "name": "Phalacrocorax niger", "quantity": 74, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 6.65 },
    { "name": "Psophia viridis", "quantity": 55, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 104.12 },
    { "name": "Felis chaus", "quantity": 98, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 122.46 },
    { "name": "Coendou prehensilis", "quantity": 70, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 4.57 },
    { "name": "Papilio canadensis", "quantity": 69, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 111.48 },
    { "name": "Heloderma horridum", "quantity": 68, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 185.66 },
    { "name": "Mungos mungo", "quantity": 28, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 88.06 },
    { "name": "Haematopus ater", "quantity": 44, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 128.66 },
    { "name": "Anastomus oscitans", "quantity": 71, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 228.57 },
    { "name": "Pytilia melba", "quantity": 66, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 51.42 },
    { "name": "Megaderma spasma", "quantity": 56, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 5.7 },
    { "name": "Priodontes maximus", "quantity": 51, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 64.22 },
    { "name": "Antechinus flavipes", "quantity": 84, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 220.07 },
    { "name": "unavailable", "quantity": 99, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 73.92 },
    { "name": "Agama sp.", "quantity": 43, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 210.13 },
    { "name": "Spheniscus magellanicus", "quantity": 11, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 246.35 },
    { "name": "Scolopax minor", "quantity": 41, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 72.81 },
    { "name": "Tursiops truncatus", "quantity": 98, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 28.48 },
    { "name": "Haliaeetus leucoryphus", "quantity": 36, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 238.21 },
    { "name": "Dicrostonyx groenlandicus", "quantity": 19, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 45.92 },
    { "name": "Castor fiber", "quantity": 77, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 129.65 },
    { "name": "Chlamydosaurus kingii", "quantity": 62, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 239.25 },
    { "name": "Macropus robustus", "quantity": 59, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 184.57 },
    { "name": "Alcelaphus buselaphus cokii", "quantity": 84, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 171.41 },
    { "name": "Bassariscus astutus", "quantity": 21, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 31.57 },
    { "name": "Mazama gouazoubira", "quantity": 99, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 222.07 },
    { "name": "Casmerodius albus", "quantity": 87, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 176.54 },
    { "name": "Panthera leo persica", "quantity": 11, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 239.08 },
    { "name": "Paradoxurus hermaphroditus", "quantity": 53, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 212.78 },
    { "name": "Equus burchelli", "quantity": 67, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 95.6 },
    { "name": "Panthera leo persica", "quantity": 68, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 44.06 },
    { "name": "Ratufa indica", "quantity": 86, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 182.83 },
    { "name": "Sarcophilus harrisii", "quantity": 78, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 103.01 },
    { "name": "Tachybaptus ruficollis", "quantity": 19, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 218.36 },
    { "name": "Climacteris melanura", "quantity": 76, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 143.08 },
    { "name": "Uraeginthus granatina", "quantity": 75, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 80.02 },
    { "name": "Meleagris gallopavo", "quantity": 100, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 132.29 },
    { "name": "Martes americana", "quantity": 7, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 89.52 },
    { "name": "Himantopus himantopus", "quantity": 73, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 122.63 },
    { "name": "Paroaria gularis", "quantity": 23, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 49.09 },
    { "name": "Rangifer tarandus", "quantity": 65, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 144.41 },
    { "name": "Lamprotornis superbus", "quantity": 29, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 96.09 },
    { "name": "Parus atricapillus", "quantity": 66, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 212.28 },
    { "name": "Conolophus subcristatus", "quantity": 19, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 84.74 },
    { "name": "Tragelaphus strepsiceros", "quantity": 97, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 62.29 },
    { "name": "Paraxerus cepapi", "quantity": 3, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 63.58 },
    { "name": "Notechis semmiannulatus", "quantity": 4, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 95.67 },
    { "name": "Leptoptilos crumeniferus", "quantity": 88, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 59.23 },
    { "name": "Bubalornis niger", "quantity": 54, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 232.49 },
    { "name": "Cercopithecus aethiops", "quantity": 86, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 27.99 },
    { "name": "Aegypius tracheliotus", "quantity": 91, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 166.78 },
    { "name": "Butorides striatus", "quantity": 70, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 99.77 },
    { "name": "Bassariscus astutus", "quantity": 57, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 83.15 },
    { "name": "Stercorarius longicausus", "quantity": 54, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 124.02 },
    { "name": "Meleagris gallopavo", "quantity": 61, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 225.92 },
    { "name": "Macropus fuliginosus", "quantity": 66, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 85.91 },
    { "name": "Thylogale stigmatica", "quantity": 22, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 194.04 },
    { "name": "Castor canadensis", "quantity": 5, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 1.42 },
    { "name": "Bubo sp.", "quantity": 60, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 14.48 },
    { "name": "Pytilia melba", "quantity": 40, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 6.96 },
    { "name": "Uraeginthus granatina", "quantity": 98, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 37.3 },
    { "name": "Felis pardalis", "quantity": 38, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 189.52 },
    { "name": "Cebus albifrons", "quantity": 10, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 233.76 },
    { "name": "Vulpes vulpes", "quantity": 64, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 12.46 },
    { "name": "Petaurus norfolcensis", "quantity": 90, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 96.46 },
    { "name": "Microcebus murinus", "quantity": 71, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 6.62 },
    { "name": "Equus burchelli", "quantity": 52, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 88.98 },
    { "name": "Mycteria ibis", "quantity": 62, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 42.04 },
    { "name": "Ateles paniscus", "quantity": 85, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 101.8 },
    { "name": "Phalaropus fulicarius", "quantity": 10, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 109.99 },
    { "name": "Egretta thula", "quantity": 37, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 173.16 },
    { "name": "Crotalus triseriatus", "quantity": 44, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 85.31 },
    { "name": "Tachyglossus aculeatus", "quantity": 3, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 225.68 },
    { "name": "Smithopsis crassicaudata", "quantity": 55, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 58.92 },
    { "name": "Ovis canadensis", "quantity": 67, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 244.51 },
    { "name": "Castor fiber", "quantity": 55, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 164.55 },
    { "name": "Gyps bengalensis", "quantity": 67, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 189.11 },
    { "name": "Felis caracal", "quantity": 28, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 241.43 },
    { "name": "Oxybelis fulgidus", "quantity": 6, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 198.49 },
    { "name": "Speotyte cuniculata", "quantity": 15, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 8.14 },
    { "name": "Gerbillus sp.", "quantity": 75, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 214.97 },
    { "name": "Graspus graspus", "quantity": 84, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 116.71 },
    { "name": "Elephas maximus bengalensis", "quantity": 33, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 72.79 },
    { "name": "Ardea golieth", "quantity": 70, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 161.82 },
    { "name": "Tamiasciurus hudsonicus", "quantity": 4, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 52.74 },
    { "name": "Streptopelia senegalensis", "quantity": 14, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 107.33 },
    { "name": "Actophilornis africanus", "quantity": 49, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 232.2 },
    { "name": "unavailable", "quantity": 92, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 177.91 },
    { "name": "Lasiodora parahybana", "quantity": 67, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 234.84 },
    { "name": "Varanus sp.", "quantity": 39, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 187.12 },
    { "name": "Sterna paradisaea", "quantity": 35, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 79.41 },
    { "name": "Crotalus cerastes", "quantity": 98, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 63.59 },
    { "name": "Phacochoerus aethiopus", "quantity": 93, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 219.09 },
    { "name": "Capreolus capreolus", "quantity": 26, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 87.27 },
    { "name": "Anthropoides paradisea", "quantity": 11, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 53.78 },
    { "name": "Francolinus coqui", "quantity": 94, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 174.07 },
    { "name": "Martes americana", "quantity": 92, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 15.87 },
    { "name": "Larus fuliginosus", "quantity": 49, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 85.58 },
    { "name": "Ovibos moschatus", "quantity": 60, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 167.72 },
    { "name": "Columba livia", "quantity": 68, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 200.36 },
    { "name": "Larus fuliginosus", "quantity": 63, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 91.54 },
    { "name": "Dusicyon thous", "quantity": 41, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 4.3 },
    { "name": "Pseudocheirus peregrinus", "quantity": 94, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 225.71 },
    { "name": "Tachybaptus ruficollis", "quantity": 12, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 198.03 },
    { "name": "Heloderma horridum", "quantity": 80, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 38.2 },
    { "name": "Mabuya spilogaster", "quantity": 55, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 69.6 },
    { "name": "Canis lupus", "quantity": 80, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 26.89 },
    { "name": "Nyctanassa violacea", "quantity": 36, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 12.81 },
    { "name": "Melanerpes erythrocephalus", "quantity": 100, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 38.05 },
    { "name": "Neotis denhami", "quantity": 10, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 187.61 },
    { "name": "Acrobates pygmaeus", "quantity": 99, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 81.79 },
    { "name": "Gopherus agassizii", "quantity": 38, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 156.4 },
    { "name": "Varanus sp.", "quantity": 53, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 141.68 },
    { "name": "Procyon lotor", "quantity": 17, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 154.98 },
    { "name": "Trichoglossus haematodus moluccanus", "quantity": 68, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 10.87 },
    { "name": "Notechis semmiannulatus", "quantity": 94, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 184.78 },
    { "name": "Cochlearius cochlearius", "quantity": 13, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 114.33 },
    { "name": "Dusicyon thous", "quantity": 25, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 214.53 },
    { "name": "Ciconia ciconia", "quantity": 97, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 8.77 },
    { "name": "Mustela nigripes", "quantity": 78, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 43.48 },
    { "name": "Lycosa godeffroyi", "quantity": 34, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 177.23 },
    { "name": "Lamprotornis nitens", "quantity": 98, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 39.61 },
    { "name": "Phascogale tapoatafa", "quantity": 57, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 33.3 },
    { "name": "Alopex lagopus", "quantity": 41, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 152.82 },
    { "name": "Paradoxurus hermaphroditus", "quantity": 40, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 25.05 },
    { "name": "Alouatta seniculus", "quantity": 35, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 200.85 },
    { "name": "Cacatua tenuirostris", "quantity": 54, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 73.82 },
    { "name": "Ovis canadensis", "quantity": 11, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 186.72 },
    { "name": "Butorides striatus", "quantity": 32, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 157.75 },
    { "name": "Aonyx capensis", "quantity": 45, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 242.96 },
    { "name": "Ovis ammon", "quantity": 56, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 160.15 },
    { "name": "Caiman crocodilus", "quantity": 42, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 174.86 },
    { "name": "Acanthaster planci", "quantity": 43, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 32.59 },
    { "name": "Phaethon aethereus", "quantity": 61, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 181.21 },
    { "name": "Kobus defassa", "quantity": 81, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 206.96 },
    { "name": "Alligator mississippiensis", "quantity": 16, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 39.1 },
    { "name": "Platalea leucordia", "quantity": 88, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 104.81 },
    { "name": "Ceryle rudis", "quantity": 69, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 92.11 },
    { "name": "Neotis denhami", "quantity": 27, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 214.69 },
    { "name": "Gazella thompsonii", "quantity": 90, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 199.64 },
    { "name": "Psittacula krameri", "quantity": 36, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 184.59 },
    { "name": "Lasiodora parahybana", "quantity": 48, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 245.16 },
    { "name": "Taxidea taxus", "quantity": 45, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 108.67 },
    { "name": "Lamprotornis nitens", "quantity": 65, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 200.23 },
    { "name": "Phoenicopterus chilensis", "quantity": 21, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 218.89 },
    { "name": "Isoodon obesulus", "quantity": 19, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 45.54 },
    { "name": "Connochaetus taurinus", "quantity": 3, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 35.88 },
    { "name": "Leptoptilus dubius", "quantity": 60, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 37.07 },
    { "name": "Pteronura brasiliensis", "quantity": 90, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 141.36 },
    { "name": "Colobus guerza", "quantity": 77, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 93.43 },
    { "name": "Felis silvestris lybica", "quantity": 27, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 91.85 },
    { "name": "Haematopus ater", "quantity": 65, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 88.34 },
    { "name": "Canis aureus", "quantity": 40, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 213.16 },
    { "name": "Semnopithecus entellus", "quantity": 79, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 134.43 },
    { "name": "Phalacrocorax varius", "quantity": 59, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 73.94 },
    { "name": "Tachybaptus ruficollis", "quantity": 43, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 129.49 },
    { "name": "unavailable", "quantity": 4, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 32.53 },
    { "name": "Anthropoides paradisea", "quantity": 14, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 107.42 },
    { "name": "Tamandua tetradactyla", "quantity": 38, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 175.01 },
    { "name": "Myotis lucifugus", "quantity": 93, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 108.62 },
    { "name": "Otaria flavescens", "quantity": 25, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 32.06 },
    { "name": "Sterna paradisaea", "quantity": 90, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 83.92 },
    { "name": "Phascolarctos cinereus", "quantity": 51, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 10.32 },
    { "name": "Estrilda erythronotos", "quantity": 92, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 207.27 },
    { "name": "Megaderma spasma", "quantity": 62, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 222.72 },
    { "name": "Sula dactylatra", "quantity": 94, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 166.36 },
    { "name": "Uraeginthus angolensis", "quantity": 43, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 85.12 },
    { "name": "Ovis orientalis", "quantity": 98, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 231.24 },
    { "name": "unavailable", "quantity": 100, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 215.14 },
    { "name": "Anastomus oscitans", "quantity": 77, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 36.42 },
    { "name": "Damaliscus dorcas", "quantity": 26, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 21.73 },
    { "name": "Chelodina longicollis", "quantity": 99, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 246.54 },
    { "name": "Halcyon smyrnesis", "quantity": 76, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 236.11 },
    { "name": "Megaderma spasma", "quantity": 25, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 107.85 },
    { "name": "Ctenophorus ornatus", "quantity": 31, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 249.53 },
    { "name": "Salvadora hexalepis", "quantity": 85, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 133.53 },
    { "name": "Melophus lathami", "quantity": 7, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 193.69 },
    { "name": "Tursiops truncatus", "quantity": 81, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 223.66 },
    { "name": "Phalaropus fulicarius", "quantity": 44, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 119.63 },
    { "name": "Odocoileus hemionus", "quantity": 3, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 6.79 },
    { "name": "Coendou prehensilis", "quantity": 3, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 200.13 },
    { "name": "Francolinus coqui", "quantity": 78, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 210.69 },
    { "name": "Redunca redunca", "quantity": 22, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 51.96 },
    { "name": "Varanus salvator", "quantity": 38, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 230.27 },
    { "name": "Libellula quadrimaculata", "quantity": 41, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 84.54 },
    { "name": "Centrocercus urophasianus", "quantity": 53, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 106.45 },
    { "name": "Mirounga leonina", "quantity": 8, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 72.23 },
    { "name": "Sula nebouxii", "quantity": 83, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 12.78 },
    { "name": "Varanus sp.", "quantity": 95, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 70.01 },
    { "name": "Cynictis penicillata", "quantity": 68, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 223.94 },
    { "name": "unavailable", "quantity": 5, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 60.56 },
    { "name": "Panthera tigris", "quantity": 69, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 14.52 }
  ]

}

