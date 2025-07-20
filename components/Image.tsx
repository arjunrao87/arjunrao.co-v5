import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => (
  <NextImage className="mx-auto max-h-96 max-w-[672px] rounded-lg object-contain" {...rest} />
)

export default Image
