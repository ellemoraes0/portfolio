export default function Menu({id, nome, link}){
    return (
        <>
            <li id={id} className="cursor-pointer">
                <a href={link}>{nome}</a>
            </li>
        </>
    )
}
