package org.regitiny.duchoashop.repository.search;

import org.regitiny.duchoashop.domain.Productmanager;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link Productmanager} entity.
 */
public interface ProductmanagerSearchRepository extends ElasticsearchRepository<Productmanager, Long> {
}
