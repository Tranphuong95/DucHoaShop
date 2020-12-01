package org.regitiny.duchoashop.repository.search;

import org.regitiny.duchoashop.domain.Model;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Model} entity.
 */
public interface ModelSearchRepository extends ElasticsearchRepository<Model, Long> {
}
