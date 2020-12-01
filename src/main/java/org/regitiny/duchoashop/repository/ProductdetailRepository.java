package org.regitiny.duchoashop.repository;

import org.regitiny.duchoashop.domain.Productdetail;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Productdetail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductdetailRepository extends JpaRepository<Productdetail, Long> {
}
