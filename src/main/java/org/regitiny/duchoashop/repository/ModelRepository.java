package org.regitiny.duchoashop.repository;

import org.regitiny.duchoashop.domain.Model;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Model entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {
}
