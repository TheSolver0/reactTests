/**
 * Ligne d'une categorie de  produit dans un tableau
 * 
 * @param {string} name 
 * @returns 
 */
export function ProductCategoryRow ({name})
{
    return (
        <tr>
            <td colSpan={2}><strong>{name}</strong></td>
        </tr>
    )
}