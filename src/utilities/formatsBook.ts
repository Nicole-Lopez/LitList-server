interface GetImageLinkParams {
	thumbnail?: string
	smallThumbnail?: string
}

interface GetISBNParams {
	type: string
	identifier: string
}

export const COVER_DEFAULT = 'https://res.cloudinary.com/du7lmw4vm/image/upload/v1685951508/LitList_ND/cover_book_default.jpg'

export const AVAILABLE_SUBJECTS = ['subject', 'place', 'person']

export const getImageLink = (
	imageLinks: GetImageLinkParams | undefined
): string => {
	if (imageLinks !== null && imageLinks !== undefined) {
		return (
			imageLinks.thumbnail ?? imageLinks.smallThumbnail ?? COVER_DEFAULT
		)
	} else {
		return COVER_DEFAULT
	}
}

export const getISBN = (ISBN: GetISBNParams[] | undefined): string[] => {
	const format = ISBN?.filter(e => e.type.includes('ISBN_')).map(
		e => e.identifier
	)

	return format !== undefined && format.length !== 0 ? format : []
}

export const getAuthors = (authors = ['Anonymous']): string[] => authors
