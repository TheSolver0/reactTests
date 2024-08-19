import { useEffect } from "react"

/**
 * Ligne d'un produit dans un tableau a 2 colonnes (nom / prix)
 * 
 * @param {{name: string, stocked:boolean, price: string}} product 
 * @returns 
 */
export function ProductRow ({product})
{
    const style = product.stocked ? undefined : {color: 'red'}

    // throw new error("Erreur Test des erreurs !!!!   ");
    

    return (
        <tr>
            <td style={style}>{product.name}</td>
            <td>{product.price}</td>
        </tr>
    )
}