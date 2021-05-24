import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { product, productProcess } from 'src/app/shared/interface/product.interface';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditProductComponent } from '../component/edit-product/edit-product.component';
import { DeleteProductComponent } from '../component/delete-product/delete-product.component';
import { CreateProductComponent } from '../component/create-product/create-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  displayedColumns: string[] = ['name', 'quantity', 'image', 'price', 'netWorht', 'crud'];
  dataSource: MatTableDataSource<productProcess>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  product: productProcess[];
  filter: string = '';
  searchQuantity: number = 0;
  searchPrice: number = 0;
  searchNetWorth: number = 0;

  advanceFilter = false;

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,) {
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

  onReset() {
    this.filter = '';
    this.searchQuantity = 0;
    this.searchPrice = 0;
    this.searchNetWorth = 0;
    this.dataSource.data = this.product;
  }

  formatLabel(value: number) {
    if (value >= 10000) {
      return '>' + (value);
    }
    return '>' + value;
  }

  applyFilterSearch() {
    const search = this.filter.trim().toLowerCase();
    let tempData = this.product.filter(data => data.name.toLowerCase().includes(search));
    tempData = tempData.filter(data => data.quantity >= this.searchQuantity);
    tempData = tempData.filter(data => data.price >= this.searchPrice);
    tempData = tempData.filter(data => data.netWorht >= this.searchNetWorth);
    this.dataSource.data = tempData;
    this.dataSource._updateChangeSubscription();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  getTotalCost() {
    return this.dataSource.data.map(t => t.netWorht).reduce((acc, value) => acc + value, 0);
  }


  openDialogUpdate(element: product): void {
    const dialogRef = this.dialog.open(EditProductComponent, {
      width: 'auto',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: product) => {
      if(result){
        this.openSnackBar('Updated successfully');
        this.product = this.product.map(prod => {
          if (prod.id === element.id) {
            return {
              ...result,
              netWorht: prod.price * prod.quantity
            }
          } else
            return prod
        })
        this.dataSource.data = this.product;
        this.dataSource._updateChangeSubscription();
        this.applyFilterSearch();
      }
    });
  }


  openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: 'auto',
      data: (this.product[this.product.length - 1].id + 1)
    });

    dialogRef.afterClosed().subscribe((result: product) => {
      if(result){
        this.openSnackBar('Created successfully');
        this.product.push({ ...result, netWorht: result.price * result.quantity })
        this.dataSource.data = this.product;
        this.dataSource._updateChangeSubscription();
        this.applyFilterSearch();
      }
    });
  }

  openDialogDelete(element: product): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      width: 'auto',
      data: element
    });

    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.openSnackBar('Deleted successfully');
        this.product = this.product.filter(prod => prod.id != element.id);
        this.dataSource.data = this.product;
        this.dataSource._updateChangeSubscription();
        this.applyFilterSearch();
      }
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2500,
    });
  }













  informationStatic = [
    { "id": 1, "name": "Panthera leo persica", "quantity": 77, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 28.43 },
    { "id": 2, "name": "Eunectes sp.", "quantity": 91, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 52.07 },
    { "id": 3, "name": "Tachybaptus ruficollis", "quantity": 62, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 247.4 },
    { "id": 4, "name": "Paradoxurus hermaphroditus", "quantity": 50, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 19.4 },
    { "id": 5, "name": "Phalacrocorax brasilianus", "quantity": 80, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 194.41 },
    { "id": 6, "name": "Loris tardigratus", "quantity": 96, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 176.4 },
    { "id": 7, "name": "Microcebus murinus", "quantity": 98, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 100.85 },
    { "id": 8, "name": "Paroaria gularis", "quantity": 49, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 14.15 },
    { "id": 9, "name": "Eubalaena australis", "quantity": 40, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 45.44 },
    { "id": 10, "name": "Phalaropus fulicarius", "quantity": 92, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 87.98 },
    { "id": 11, "name": "Gekko gecko", "quantity": 3, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 93.85 },
    { "id": 12, "name": "Naja nivea", "quantity": 78, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 199.71 },
    { "id": 13, "name": "Lasiorhinus latifrons", "quantity": 64, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 232.55 },
    { "id": 14, "name": "Nyctea scandiaca", "quantity": 17, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 39.6 },
    { "id": 15, "name": "Vulpes chama", "quantity": 4, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 5.93 },
    { "id": 16, "name": "Aonyx capensis", "quantity": 98, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 131.12 },
    { "id": 17, "name": "Pavo cristatus", "quantity": 18, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 129.8 },
    { "id": 18, "name": "Diomedea irrorata", "quantity": 47, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 248.38 },
    { "id": 19, "name": "Lepus townsendii", "quantity": 17, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 166.66 },
    { "id": 20, "name": "Amazona sp.", "quantity": 12, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 175.69 },
    { "id": 21, "name": "Panthera pardus", "quantity": 72, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 100.81 },
    { "id": 22, "name": "Sagittarius serpentarius", "quantity": 90, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 171.34 },
    { "id": 23, "name": "Phalacrocorax niger", "quantity": 16, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 1.81 },
    { "id": 24, "name": "Halcyon smyrnesis", "quantity": 72, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 223.18 },
    { "id": 25, "name": "Hippotragus niger", "quantity": 45, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 37.16 },
    { "id": 26, "name": "Pteronura brasiliensis", "quantity": 68, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 130.78 },
    { "id": 27, "name": "Gyps fulvus", "quantity": 33, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 144.48 },
    { "id": 28, "name": "Ramphastos tucanus", "quantity": 12, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 78.36 },
    { "id": 29, "name": "Sterna paradisaea", "quantity": 40, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 50.35 },
    { "id": 30, "name": "Dicrostonyx groenlandicus", "quantity": 66, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 175.25 },
    { "id": 31, "name": "Catharacta skua", "quantity": 27, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 150.04 },
    { "id": 32, "name": "Francolinus swainsonii", "quantity": 62, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 73.5 },
    { "id": 33, "name": "Libellula quadrimaculata", "quantity": 99, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 49.3 },
    { "id": 34, "name": "Phalaropus lobatus", "quantity": 64, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 236.77 },
    { "id": 35, "name": "Dasyurus viverrinus", "quantity": 35, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 199.24 },
    { "id": 36, "name": "Cordylus giganteus", "quantity": 64, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 161.23 },
    { "id": 37, "name": "Eubalaena australis", "quantity": 98, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 247.17 },
    { "id": 38, "name": "Grus rubicundus", "quantity": 33, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 42.99 },
    { "id": 39, "name": "Isoodon obesulus", "quantity": 6, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 46.18 },
    { "id": 40, "name": "Arctogalidia trivirgata", "quantity": 74, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 102.82 },
    { "id": 41, "name": "Agkistrodon piscivorus", "quantity": 42, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 86.14 },
    { "id": 42, "name": "Phascogale calura", "quantity": 50, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 190.32 },
    { "id": 43, "name": "Stercorarius longicausus", "quantity": 55, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 148.42 },
    { "id": 44, "name": "Melanerpes erythrocephalus", "quantity": 89, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 19.41 },
    { "id": 45, "name": "Mycteria ibis", "quantity": 90, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 151.19 },
    { "id": 46, "name": "Equus burchelli", "quantity": 12, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 243.26 },
    { "id": 47, "name": "Ciconia episcopus", "quantity": 93, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 14.15 },
    { "id": 48, "name": "Agkistrodon piscivorus", "quantity": 4, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 115.32 },
    { "id": 49, "name": "Rhea americana", "quantity": 63, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 85.06 },
    { "id": 50, "name": "Macropus parryi", "quantity": 88, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 176.57 },
    { "id": 51, "name": "Ammospermophilus nelsoni", "quantity": 81, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 186.31 },
    { "id": 52, "name": "Anastomus oscitans", "quantity": 88, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 180.42 },
    { "id": 53, "name": "Uraeginthus granatina", "quantity": 65, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 80.59 },
    { "id": 54, "name": "Nannopterum harrisi", "quantity": 76, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 134.4 },
    { "id": 55, "name": "Aquila chrysaetos", "quantity": 50, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 164.63 },
    { "id": 56, "name": "Taxidea taxus", "quantity": 41, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 154.61 },
    { "id": 57, "name": "Phalaropus fulicarius", "quantity": 46, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 135.0 },
    { "id": 58, "name": "Lepus townsendii", "quantity": 17, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 47.16 },
    { "id": 59, "name": "Meles meles", "quantity": 2, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 128.36 },
    { "id": 60, "name": "Toxostoma curvirostre", "quantity": 11, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 35.29 },
    { "id": 61, "name": "Ratufa indica", "quantity": 58, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 26.5 },
    { "id": 62, "name": "Zalophus californicus", "quantity": 32, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 139.71 },
    { "id": 63, "name": "Chordeiles minor", "quantity": 4, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 63.66 },
    { "id": 64, "name": "Plegadis ridgwayi", "quantity": 39, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 59.8 },
    { "id": 65, "name": "Columba palumbus", "quantity": 22, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 116.6 },
    { "id": 66, "name": "Corvus brachyrhynchos", "quantity": 18, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 75.36 },
    { "id": 67, "name": "Phaethon aethereus", "quantity": 8, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 113.73 },
    { "id": 68, "name": "Nyctea scandiaca", "quantity": 12, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 247.87 },
    { "id": 69, "name": "Canis aureus", "quantity": 1, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 191.81 },
    { "id": 70, "name": "Cacatua tenuirostris", "quantity": 22, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 151.19 },
    { "id": 71, "name": "Egretta thula", "quantity": 26, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 138.86 },
    { "id": 72, "name": "Aegypius occipitalis", "quantity": 73, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 235.27 },
    { "id": 73, "name": "Vanellus chilensis", "quantity": 21, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 117.44 },
    { "id": 74, "name": "Naja haje", "quantity": 55, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 139.35 },
    { "id": 75, "name": "Larus novaehollandiae", "quantity": 29, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 94.78 },
    { "id": 76, "name": "Zonotrichia capensis", "quantity": 81, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 12.1 },
    { "id": 77, "name": "Macropus fuliginosus", "quantity": 37, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 167.36 },
    { "id": 78, "name": "Milvago chimachima", "quantity": 41, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 188.03 },
    { "id": 79, "name": "Zalophus californicus", "quantity": 69, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 207.62 },
    { "id": 80, "name": "Scolopax minor", "quantity": 30, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 19.3 },
    { "id": 81, "name": "Climacteris melanura", "quantity": 73, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 51.24 },
    { "id": 82, "name": "Cynomys ludovicianus", "quantity": 4, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 28.21 },
    { "id": 83, "name": "Papio cynocephalus", "quantity": 62, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 144.91 },
    { "id": 84, "name": "Leptoptilus dubius", "quantity": 64, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 114.04 },
    { "id": 85, "name": "Ciconia ciconia", "quantity": 9, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 72.4 },
    { "id": 86, "name": "Ephipplorhynchus senegalensis", "quantity": 12, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 145.41 },
    { "id": 87, "name": "Charadrius tricollaris", "quantity": 43, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 67.97 },
    { "id": 88, "name": "Herpestes javanicus", "quantity": 99, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 228.35 },
    { "id": 89, "name": "Isoodon obesulus", "quantity": 78, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 113.67 },
    { "id": 90, "name": "Ceryle rudis", "quantity": 8, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 231.31 },
    { "id": 91, "name": "Naja haje", "quantity": 86, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 82.0 },
    { "id": 92, "name": "Egretta thula", "quantity": 62, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 218.13 },
    { "id": 93, "name": "Pseudoleistes virescens", "quantity": 6, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 178.93 },
    { "id": 94, "name": "Columba livia", "quantity": 4, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 179.95 },
    { "id": 95, "name": "Dendrocitta vagabunda", "quantity": 19, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 100.69 },
    { "id": 96, "name": "Ateles paniscus", "quantity": 68, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 96.94 },
    { "id": 97, "name": "Dipodomys deserti", "quantity": 41, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 144.8 },
    { "id": 98, "name": "Lepus townsendii", "quantity": 93, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 237.93 },
    { "id": 99, "name": "Tragelaphus angasi", "quantity": 11, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 117.63 },
    { "id": 100, "name": "Acrobates pygmaeus", "quantity": 97, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 156.02 },
    { "id": 101, "name": "Porphyrio porphyrio", "quantity": 100, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 79.99 },
    { "id": 102, "name": "Ictalurus furcatus", "quantity": 9, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 191.6 },
    { "id": 103, "name": "Butorides striatus", "quantity": 13, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 33.13 },
    { "id": 104, "name": "Terathopius ecaudatus", "quantity": 43, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 192.8 },
    { "id": 105, "name": "Melursus ursinus", "quantity": 51, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 156.74 },
    { "id": 106, "name": "Spermophilus armatus", "quantity": 100, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 167.87 },
    { "id": 107, "name": "Ramphastos tucanus", "quantity": 46, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 48.13 },
    { "id": 108, "name": "Meleagris gallopavo", "quantity": 76, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 20.65 },
    { "id": 109, "name": "Snycerus caffer", "quantity": 25, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 64.98 },
    { "id": 110, "name": "Balearica pavonina", "quantity": 91, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 232.79 },
    { "id": 111, "name": "Cervus canadensis", "quantity": 19, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 191.86 },
    { "id": 112, "name": "Pavo cristatus", "quantity": 80, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 65.96 },
    { "id": 113, "name": "Priodontes maximus", "quantity": 57, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 169.78 },
    { "id": 114, "name": "Corvus brachyrhynchos", "quantity": 49, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 198.87 },
    { "id": 115, "name": "Vulpes chama", "quantity": 18, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 145.37 },
    { "id": 116, "name": "Coluber constrictor foxii", "quantity": 56, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 167.51 },
    { "id": 117, "name": "Felis chaus", "quantity": 76, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 115.85 },
    { "id": 118, "name": "Sceloporus magister", "quantity": 81, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 120.39 },
    { "id": 119, "name": "Vanellus sp.", "quantity": 42, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 51.2 },
    { "id": 120, "name": "Pteropus rufus", "quantity": 99, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 176.5 },
    { "id": 121, "name": "Capreolus capreolus", "quantity": 92, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 95.56 },
    { "id": 122, "name": "Papio cynocephalus", "quantity": 15, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 233.67 },
    { "id": 123, "name": "Funambulus pennati", "quantity": 14, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 55.76 },
    { "id": 124, "name": "Microcebus murinus", "quantity": 6, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 208.21 },
    { "id": 125, "name": "Raphicerus campestris", "quantity": 95, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 220.23 },
    { "id": 126, "name": "Macropus robustus", "quantity": 2, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 122.7 },
    { "id": 127, "name": "Mellivora capensis", "quantity": 57, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 28.04 },
    { "id": 128, "name": "Marmota caligata", "quantity": 4, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 106.94 },
    { "id": 129, "name": "Hymenolaimus malacorhynchus", "quantity": 72, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 110.09 },
    { "id": 130, "name": "Eutamias minimus", "quantity": 27, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 21.21 },
    { "id": 131, "name": "Varanus sp.", "quantity": 98, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 42.85 },
    { "id": 132, "name": "Naja haje", "quantity": 62, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 239.5 },
    { "id": 133, "name": "Tayassu tajacu", "quantity": 52, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 52.44 },
    { "id": 134, "name": "Ammospermophilus nelsoni", "quantity": 29, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 84.8 },
    { "id": 135, "name": "Nyctanassa violacea", "quantity": 8, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 197.3 },
    { "id": 136, "name": "Phalacrocorax varius", "quantity": 70, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 104.86 },
    { "id": 137, "name": "Phalacrocorax niger", "quantity": 7, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 129.13 },
    { "id": 138, "name": "Eremophila alpestris", "quantity": 65, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 214.04 },
    { "id": 139, "name": "Suricata suricatta", "quantity": 45, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 60.65 },
    { "id": 140, "name": "Macropus agilis", "quantity": 53, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 184.05 },
    { "id": 141, "name": "Semnopithecus entellus", "quantity": 84, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 219.08 },
    { "id": 142, "name": "Camelus dromedarius", "quantity": 18, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 136.86 },
    { "id": 143, "name": "Naja nivea", "quantity": 89, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 93.3 },
    { "id": 144, "name": "Zenaida galapagoensis", "quantity": 88, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 106.41 },
    { "id": 145, "name": "Ovibos moschatus", "quantity": 90, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 224.98 },
    { "id": 146, "name": "Alligator mississippiensis", "quantity": 66, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 101.1 },
    { "id": 147, "name": "Cervus elaphus", "quantity": 82, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 150.08 },
    { "id": 148, "name": "Dicrurus adsimilis", "quantity": 75, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 72.28 },
    { "id": 149, "name": "Manouria emys", "quantity": 76, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 249.26 },
    { "id": 150, "name": "Larus fuliginosus", "quantity": 72, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 26.62 },
    { "id": 151, "name": "Dasypus novemcinctus", "quantity": 67, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 58.46 },
    { "id": 152, "name": "Cebus apella", "quantity": 33, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 5.19 },
    { "id": 153, "name": "Stenella coeruleoalba", "quantity": 68, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 239.96 },
    { "id": 154, "name": "Milvago chimachima", "quantity": 10, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 234.46 },
    { "id": 155, "name": "Axis axis", "quantity": 4, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 34.2 },
    { "id": 156, "name": "Pseudalopex gymnocercus", "quantity": 70, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 234.13 },
    { "id": 157, "name": "Pseudocheirus peregrinus", "quantity": 85, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 51.92 },
    { "id": 158, "name": "Ratufa indica", "quantity": 22, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 114.32 },
    { "id": 159, "name": "Lepus townsendii", "quantity": 60, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 137.06 },
    { "id": 160, "name": "Pycnonotus nigricans", "quantity": 66, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 162.63 },
    { "id": 161, "name": "unavailable", "quantity": 79, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 142.46 },
    { "id": 162, "name": "Alligator mississippiensis", "quantity": 48, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 6.81 },
    { "id": 163, "name": "Ninox superciliaris", "quantity": 29, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 129.15 },
    { "id": 164, "name": "Francolinus coqui", "quantity": 4, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 139.66 },
    { "id": 165, "name": "Lepus townsendii", "quantity": 26, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 152.36 },
    { "id": 166, "name": "Ictonyx striatus", "quantity": 31, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 8.82 },
    { "id": 167, "name": "Lybius torquatus", "quantity": 90, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 122.21 },
    { "id": 168, "name": "Cervus canadensis", "quantity": 96, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 44.86 },
    { "id": 169, "name": "Ephippiorhynchus mycteria", "quantity": 90, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 141.5 },
    { "id": 170, "name": "Tringa glareola", "quantity": 71, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 37.8 },
    { "id": 171, "name": "Larus sp.", "quantity": 72, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 147.81 },
    { "id": 172, "name": "Pseudalopex gymnocercus", "quantity": 13, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 169.91 },
    { "id": 173, "name": "Choloepus hoffmani", "quantity": 1, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 173.49 },
    { "id": 174, "name": "unavailable", "quantity": 49, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 100.45 },
    { "id": 175, "name": "Phascogale calura", "quantity": 29, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 207.24 },
    { "id": 176, "name": "unavailable", "quantity": 80, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 11.26 },
    { "id": 177, "name": "Amblyrhynchus cristatus", "quantity": 3, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 155.8 },
    { "id": 178, "name": "Morelia spilotes variegata", "quantity": 52, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 1.47 },
    { "id": 179, "name": "Streptopelia senegalensis", "quantity": 97, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 26.81 },
    { "id": 180, "name": "Leprocaulinus vipera", "quantity": 76, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 208.95 },
    { "id": 181, "name": "Choriotis kori", "quantity": 32, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 213.77 },
    { "id": 182, "name": "Colobus guerza", "quantity": 39, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 190.13 },
    { "id": 183, "name": "Delphinus delphis", "quantity": 2, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 206.53 },
    { "id": 184, "name": "Bison bison", "quantity": 4, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 78.75 },
    { "id": 185, "name": "Semnopithecus entellus", "quantity": 80, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 120.59 },
    { "id": 186, "name": "Lama glama", "quantity": 2, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 77.75 },
    { "id": 187, "name": "Meles meles", "quantity": 99, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 134.21 },
    { "id": 188, "name": "Dicrostonyx groenlandicus", "quantity": 7, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 56.67 },
    { "id": 189, "name": "Bos frontalis", "quantity": 29, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 123.88 },
    { "id": 190, "name": "Columba livia", "quantity": 65, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 191.35 },
    { "id": 191, "name": "Pavo cristatus", "quantity": 2, "image": "http://dummyimage.com/100x100.png/ff4444/ffffff", "price": 144.55 },
    { "id": 192, "name": "Anthropoides paradisea", "quantity": 71, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 162.21 },
    { "id": 193, "name": "Genetta genetta", "quantity": 77, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 132.42 },
    { "id": 194, "name": "Amphibolurus barbatus", "quantity": 27, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 83.5 },
    { "id": 195, "name": "Dasypus novemcinctus", "quantity": 38, "image": "http://dummyimage.com/100x100.png/5fa2dd/ffffff", "price": 20.48 },
    { "id": 196, "name": "Actophilornis africanus", "quantity": 81, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 174.55 },
    { "id": 197, "name": "Choloepus hoffmani", "quantity": 80, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 86.25 },
    { "id": 198, "name": "Aonyx capensis", "quantity": 90, "image": "http://dummyimage.com/100x100.png/dddddd/000000", "price": 45.0 },
    { "id": 199, "name": "Alopex lagopus", "quantity": 94, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 85.08 },
    { "id": 200, "name": "Dendrocygna viduata", "quantity": 1, "image": "http://dummyimage.com/100x100.png/cc0000/ffffff", "price": 93.45 }
  ]

}

