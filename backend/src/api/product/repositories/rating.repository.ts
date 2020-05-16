import { EntityRepository, Repository } from "typeorm";

import { Rating } from "../../shared/entities/rating.entity";

@EntityRepository(Rating)
export class RatingRepository extends Repository<Rating> {}
