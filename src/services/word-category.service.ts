import { CreateWordCategoryDto, createWordCategorySchema } from '../dto/word-category';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { CategoryRepository } from '../repositories/category.repository';
import { WordCategoryRepository } from '../repositories/word-category.repository';
import { WordRepository } from '../repositories/word.repository';
import { CATEGORY_NOT_FOUND, WORD_CATEGORY_NOT_FOUND, WORD_NOT_FOUND } from '../utilities/messages.utility';


export class WordCategoryService {
    private wordCategoryRepository: WordCategoryRepository;
    private wordRepository: WordRepository;
    private categoryRepository: CategoryRepository;

    constructor() {
        this.wordCategoryRepository = new WordCategoryRepository();
        this.wordRepository = new WordRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async saveWordCategory(wordCategory: CreateWordCategoryDto) {
        const responseByIdWord = await this.wordRepository.findWordById(wordCategory.idWord);
        const responseByIdCategory = await this.categoryRepository.findCategoryById(wordCategory.idCategory);
        const data = createWordCategorySchema.validate(wordCategory, { abortEarly: false });

        if (data.error) throw mapJoiErrors(data.error.details);
        if (!responseByIdWord) throw new Error(WORD_NOT_FOUND);
        if (!responseByIdCategory) throw new Error(CATEGORY_NOT_FOUND);

        return await this.wordCategoryRepository.saveWordCategory(wordCategory);
    }

    async deleteWordCategory(id: number) {
        const responseById = await this.wordCategoryRepository.findWordCategoryById(id);

        if (!responseById) throw new Error(WORD_CATEGORY_NOT_FOUND);

        this.wordCategoryRepository.deleteWordCategory(id);
    }
}