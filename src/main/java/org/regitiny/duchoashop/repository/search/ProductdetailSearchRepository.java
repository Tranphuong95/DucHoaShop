package org.regitiny.duchoashop.repository.search;

import org.regitiny.duchoashop.domain.Productdetail;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Productdetail} entity.
 */
public interface ProductdetailSearchRepository extends ElasticsearchRepository<Productdetail, Long> {
}
