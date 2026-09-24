const position = {
  wheat: '0% 0%', rice: '50% 0%', maize: '100% 0%',
  riceBag: '0% 100%', jaggery: '50% 100%', ghee: '100% 100%',
}

export default function ProduceImage({ type, className = '' }) {
  return <span role="img" aria-label={type} className={`inline-block shrink-0 rounded-lg bg-white bg-[url('/images/dashboard/produce-grid.png')] bg-[length:300%_200%] bg-no-repeat ${className}`} style={{ backgroundPosition: position[type] || position.wheat }} />
}
