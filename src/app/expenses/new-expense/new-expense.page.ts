import { ExpensesService } from './../expenses.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


@Component({
  selector: 'app-new-expense',
  templateUrl: './new-expense.page.html',
  styleUrls: ['./new-expense.page.scss'],
})
export class NewExpensePage implements OnInit {

  form: FormGroup;

  constructor(private expensesService: ExpensesService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({

        title: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        description: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.maxLength(180)]
        }),
        cost: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required, Validators.min(0)]
        }),
        imageLoc: new FormControl(null, {
          updateOn: 'blur',
          validators: [Validators.required]
        })
        // ,
        // expenseDate: new FormControl(new Date(), {
        //   updateOn: 'blur',
        //   validators: [Validators.required]
        // })

    });
  }

  onImagePicked(imageData: string | File) {
    // let imageFile;
    // console.log(imageData);
    // let pngTest;
    // if (typeof imageData === 'string'){
    //   pngTest = imageData.substring(0,22);
    //   if (pngTest = "data:image/png;base64,")
    //   {
    //   try {     
    //      // console.log(imageData);
    //       imageFile = base64toBlob(imageData.replace('data:image/png;base64,', ''), 'image/jpeg');
        
    //     } catch (error){
    //     console.log(error);
    //     return;
    //   }
    // } else {
    //   console.log('or');
    //     imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg');
    //     // console.log(imageFile, 'xxx') ;
    // }

    // } else {
    //   imageFile = imageData;
    //   // console.log(imageFile);
    // }
    this.form.patchValue({ imageLoc: imageData });
  }

  onCreateExpense() {
    // console.log(this.form.get('imageLoc').value);
    // console.log(this.form);
    if (!this.form.valid || !this.form.get('imageLoc').value) {
    
      return;
      
    }
    
    // tslint:disable-next-line: max-line-length
    this.expensesService.addExpense(
      this.form.value.title,
      this.form.value.description,
      +this.form.value.cost,
      new Date(),
      this.form.value.imageLoc
    );
    this.form.reset();
    this.router.navigate(['/expenses/tabs/view-expenses']);
  }

}

