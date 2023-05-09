fetch("admin.json")

.then(function(response){
    return response.json();
})
.then(function(data){
    let placeholder= document.querySelector("#data-output");
    let out ="",c=0;
    for(let product of data){
        out += `
        <tr>  
        <td>${product.Title}</td>
        <td>${product.Author}</td>
        <td>${product.Subject}</td>
        <td>${product.Publishdate}</td>
        <td>${product.NoofBooks}</td>
        <td>${product.BooksAvailable}</td>
        <td>${product.BooksIssued}</td>
        
        </tr>
        `;
        c++;
    }
    placeholder.innerHTML = out;
    
    $(".sampleTable").fancyTable({
        sortColumn:0,
        pagination: true,
        perPage:5,
        globalSearch:true
    });

    row = $('.fancySearchRow');
            row.insertBefore(row.prev());

})