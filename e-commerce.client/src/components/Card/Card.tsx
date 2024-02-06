import CardStyles from './Card.module.scss'

type CardProps = {
    name: string;
}
function Card({ name }: CardProps) {
    return (
        <div className={CardStyles.Card}>{name}</div>
  );
}

export default Card;